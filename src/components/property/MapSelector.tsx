"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { MapPin, Search, AlertCircle } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface MapSelectorProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
}

const MapSelector = ({
  onLocationSelect,
  initialLocation,
}: MapSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    initialLocation || null,
  );
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const sessionTokenRef = useRef(crypto.randomUUID());

  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error("Mapbox access token is missing");
      setMapError(
        "Mapbox API key not configured. Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables.",
      );
      return;
    }

    const initializeMapWithDelay = setTimeout(() => {
      if (!mapContainerRef.current || mapRef.current) return;

      try {
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

        const initialLatitude = initialLocation?.lat || 19.076;
        const initialLongitude = initialLocation?.lng || 72.8777;

        const mapInstance = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [initialLongitude, initialLatitude],
          zoom: 14,
          attributionControl: false,
          pitchWithRotate: false,
          trackResize: true,
          antialias: true,
          maxZoom: 18,
          minZoom: 4,
          clickTolerance: 3,
        });

        mapRef.current = mapInstance;

        mapInstance.addControl(
          new mapboxgl.AttributionControl(),
          "bottom-right",
        );
        mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");

        mapInstance.on("load", () => {
          console.log("Map loaded successfully");
          setMapLoaded(true);

          setTimeout(() => {
            if (mapRef.current) {
              mapRef.current.resize();
            }
          }, 200);

          if (initialLocation && mapRef.current) {
            markerRef.current = new mapboxgl.Marker({
              color: "#FF0000",
              draggable: true,
            })
              .setLngLat([initialLocation.lng, initialLocation.lat])
              .addTo(mapRef.current);

            if (markerRef.current) {
              markerRef.current.on("dragend", handleMarkerDragEnd);
            }
          }
        });

        mapInstance.on("error", (e) => {
          console.error("Mapbox error:", e);
          setMapError("Failed to load map");
        });

        mapInstance.on("click", (e) => {
          try {
            if (!mapRef.current) return;
            handleMapClick(e);
          } catch (error) {
            console.error("Error handling map click:", error);
          }
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Failed to initialize map");
      }
    }, 100);
    return () => {
      clearTimeout(initializeMapWithDelay);
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [MAPBOX_ACCESS_TOKEN, initialLocation]);

  useEffect(() => {
    const handleResize = () => {
      if (!mapRef.current || !mapLoaded) return;

      try {
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.resize();
          }
        }, 100);
      } catch (error) {
        console.error("Error resizing map:", error);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mapLoaded]);

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const fetchSuggestions = async () => {
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error("Mapbox access token is not defined");
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchQuery}&language=en&limit=5&session_token=${sessionTokenRef.current}&country=IN&access_token=${MAPBOX_ACCESS_TOKEN}`,
      );
      const data = await response.json();
      setSuggestions(
        data.suggestions?.filter((s: any) => s.full_address) || [],
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion: any) => {
    if (!MAPBOX_ACCESS_TOKEN || !mapRef.current) {
      console.error("Mapbox access token or map is not defined");
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?session_token=${sessionTokenRef.current}&access_token=${MAPBOX_ACCESS_TOKEN}`,
      );
      const data = await response.json();
      const coordinates = data.features[0]?.geometry?.coordinates;

      if (coordinates) {
        const newLocation = {
          lat: coordinates[1],
          lng: coordinates[0],
          address: suggestion.full_address || "",
        };
        updateLocation(newLocation);
        mapRef.current.flyTo({
          center: [newLocation.lng, newLocation.lat],
          zoom: 16,
        });
        setSearchQuery("");
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const handleMapClick = (event: mapboxgl.MapMouseEvent) => {
    try {
      if (!mapRef.current) return;

      const { lng, lat } = event.lngLat;
      const newLocation = {
        lat,
        lng,
        address: selectedLocation?.address || "",
      };
      updateLocation(newLocation);
    } catch (error) {
      console.error("Error handling map click:", error);
    }
  };

  const handleMarkerDragEnd = () => {
    if (!markerRef.current || !mapRef.current) return;

    const lngLat = markerRef.current.getLngLat();
    const newLocation = {
      lat: lngLat.lat,
      lng: lngLat.lng,
      address: selectedLocation?.address || "",
    };
    setSelectedLocation(newLocation);
    onLocationSelect(newLocation);
  };

  const updateLocation = (newLocation: Location) => {
    setSelectedLocation(newLocation);
    onLocationSelect(newLocation);

    if (mapRef.current) {
      if (markerRef.current) {
        markerRef.current.setLngLat([newLocation.lng, newLocation.lat]);
      } else {
        markerRef.current = new mapboxgl.Marker({
          color: "#FF0000",
          draggable: true,
        })
          .setLngLat([newLocation.lng, newLocation.lat])
          .addTo(mapRef.current);

        markerRef.current.on("dragend", handleMarkerDragEnd);
      }
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border">
      <div className="absolute top-4 right-4 left-4 z-10">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location in Maharashtra..."
            className="h-10 pr-10"
            disabled={!MAPBOX_ACCESS_TOKEN || !!mapError}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="text-muted-foreground h-4 w-4" />
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute top-full right-0 left-0 z-20 mt-1">
            <ScrollArea className="h-auto max-h-[180px]">
              <div className="bg-background rounded-md border p-1 shadow-md">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.mapbox_id}
                    type="button"
                    className="hover:bg-muted w-full cursor-pointer rounded-sm px-2 py-1.5 text-left text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.full_address}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {mapError ? (
        <div className="flex h-full flex-col items-center justify-center p-4">
          <AlertCircle className="text-destructive mb-2 h-8 w-8" />
          <p className="text-center text-sm font-medium">{mapError}</p>
        </div>
      ) : (
        <div
          id="map-container"
          ref={mapContainerRef}
          className="h-full w-full"
        />
      )}

      {mapLoaded && !mapError && (
        <div className="bg-background/80 absolute bottom-4 left-4 rounded-md p-2 backdrop-blur-sm">
          <p className="text-xs">
            {selectedLocation
              ? "Drag pin to adjust location"
              : "Click on map to place pin"}
          </p>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
