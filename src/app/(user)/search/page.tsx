"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import {
  Home,
  MapPin,
  Building,
  Landmark,
  Filter,
  Search as SearchIcon,
} from "lucide-react";
import { cn, trim } from "~/lib/utils";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";

const MAHARASHTRA_CITIES = [
  { id: "all", name: "All Cities" },
  { id: "mumbai", name: "Mumbai" },
  { id: "pune", name: "Pune" },
  { id: "nagpur", name: "Nagpur" },
  { id: "nashik", name: "Nashik" },
  { id: "aurangabad", name: "Aurangabad" },
  { id: "solapur", name: "Solapur" },
  { id: "thane", name: "Thane" },
  { id: "kalyan", name: "Kalyan" },
];

const MOCK_PROPERTIES = [
  {
    id: "prop1",
    title: "Residential Plot near Hinjewadi",
    type: "Residential",
    subType: "land",
    status: "ACTIVE",
    area: "2400",
    unitOfMeasurement: "sqft",
    price: "₹80,00,000",
    district: "pune",
    city: "Pune",
    taluka: "Mulshi",
    village: "Hinjewadi",
    address: "Survey No. 123, Hinjewadi Phase 3, Pune",
    verified: true,
    thumbnail:
      "https://images.unsplash.com/photo-1719400525704-dca5a44747c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    legalDetails: {
      naviSharat: true,
      juniSharat: false,
    },
    landDetails: {
      naClass: "na_approved",
    },
    documents: 4,
    photos: 6,
    lastUpdated: "2024-04-12",
  },
  {
    id: "prop2",
    title: "2BHK Apartment in Koregaon Park",
    type: "Residential",
    subType: "flat",
    status: "ACTIVE",
    area: "1200",
    unitOfMeasurement: "sqft",
    price: "₹1,20,00,000",
    district: "pune",
    city: "Pune",
    address: "Blue Ridge Society, Koregaon Park, Pune",
    verified: true,
    thumbnail:
      "https://images.unsplash.com/photo-1744311971549-9c529b60b98a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buildingDetails: {
      floors: "4",
      condition: "ready_to_move",
      reraRegistered: true,
    },
    documents: 5,
    photos: 8,
    lastUpdated: "2024-04-10",
  },
  {
    id: "prop3",
    title: "Agricultural Land with Water Source",
    type: "Agricultural",
    subType: "farm",
    status: "ACTIVE",
    area: "2",
    unitOfMeasurement: "acre",
    price: "₹50,00,000",
    district: "nashik",
    city: "Nashik",
    taluka: "Dindori",
    village: "Vani",
    address: "Gat No. 45, Vani, Dindori, Nashik",
    verified: true,
    thumbnail:
      "https://images.unsplash.com/photo-1622353133218-825cfebb6844?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    landDetails: {
      naClass: "agricultural",
      waterSource: "borewell",
    },
    documents: 3,
    photos: 4,
    lastUpdated: "2024-04-05",
  },
  {
    id: "prop4",
    title: "Luxury Villa in Lonavala",
    type: "Residential",
    subType: "house",
    status: "ACTIVE",
    area: "4500",
    unitOfMeasurement: "sqft",
    price: "₹3,50,00,000",
    district: "pune",
    city: "Pune",
    taluka: "Maval",
    address: "Royal Palms, Lonavala, Pune",
    verified: true,
    thumbnail:
      "https://images.unsplash.com/photo-1617978241112-898785df45b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buildingDetails: {
      condition: "ready_to_move",
    },
    documents: 7,
    photos: 12,
    lastUpdated: "2024-04-15",
  },
  {
    id: "prop5",
    title: "Commercial Plot in MIDC",
    type: "Commercial",
    subType: "land",
    status: "ACTIVE",
    area: "10000",
    unitOfMeasurement: "sqft",
    price: "₹2,50,00,000",
    district: "pune",
    city: "Pune",
    taluka: "Haveli",
    village: "Wagholi",
    address: "Plot No. 78, MIDC, Wagholi, Pune",
    verified: true,
    thumbnail:
      "https://images.unsplash.com/photo-1642065569609-c500f302610e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    landDetails: {
      naClass: "na_approved",
    },
    documents: 5,
    photos: 3,
    lastUpdated: "2024-04-07",
  },
  {
    id: "prop6",
    title: "3BHK Apartment in Viman Nagar",
    type: "Residential",
    subType: "flat",
    status: "ACTIVE",
    area: "1800",
    unitOfMeasurement: "sqft",
    price: "₹1,80,00,000",
    district: "pune",
    city: "Pune",
    address: "Nyati Empire, Viman Nagar, Pune",
    verified: true,
    thumbnail:
      "https://images.unsplash.com/photo-1617228133035-2347f159e755?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buildingDetails: {
      floors: "12",
      condition: "ready_to_move",
      reraRegistered: true,
    },
    documents: 6,
    photos: 9,
    lastUpdated: "2024-04-13",
  },
];

const PropertyCard = ({
  property,
}: {
  property: (typeof MOCK_PROPERTIES)[0];
}) => {
  return (
    <Link href={`/search/${property.id}`}>
      <Card className="hover:border-primary/30 relative gap-4 overflow-hidden p-0 transition-all hover:shadow-md">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={property.thumbnail}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-md h-5 overflow-hidden">
            {trim(property.title, 32)}
          </CardTitle>

          <CardDescription className="flex items-center gap-1 text-xs">
            <MapPin className="h-3.5 w-3.5" />
            {trim(property.address, 32)}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Type</p>
              <p className="font-medium">{property.type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Area</p>
              <p className="font-medium">
                {property.area} {property.unitOfMeasurement}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Price</p>
              <p className="font-medium">{property.price}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Location</p>
              <p className="font-medium">{property.city}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const PropertyCardSkeleton = () => {
  return (
    <Card className="relative gap-4 overflow-hidden p-0">
      <Skeleton className="aspect-[16/9] w-full" />
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface FilterState {
  city: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  verified: boolean;
  keyword: string;
}

export default function SearchProperties() {
  const [filters, setFilters] = useState<FilterState>({
    city: "all",
    propertyType: "",
    minPrice: 0,
    maxPrice: 50000000,
    verified: true,
    keyword: "",
  });

  const [filteredProperties, setFilteredProperties] = useState(MOCK_PROPERTIES);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsFiltering(true);

    const timer = setTimeout(() => {
      const filtered = MOCK_PROPERTIES.filter((property) => {
        if (
          filters.keyword &&
          !(
            property.title
              .toLowerCase()
              .includes(filters.keyword.toLowerCase()) ||
            property.address
              .toLowerCase()
              .includes(filters.keyword.toLowerCase())
          )
        ) {
          return false;
        }

        if (filters.propertyType && property.subType !== filters.propertyType) {
          return false;
        }

        if (
          filters.city !== "all" &&
          property.city.toLowerCase() !== filters.city
        ) {
          return false;
        }

        const price = parseFloat(property.price.replace(/[₹,]/g, ""));
        if (price < filters.minPrice || price > filters.maxPrice) {
          return false;
        }

        if (filters.verified && !property.verified) {
          return false;
        }

        return true;
      });

      setFilteredProperties(filtered);
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: "all",
      propertyType: "",
      minPrice: 0,
      maxPrice: 50000000,
      verified: true,
      keyword: "",
    });
  };

  const formatPriceLabel = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} Lac`;
    } else {
      return `₹${value.toLocaleString()}`;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={() => setExpandedFilters(!expandedFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div
          className={cn(
            "transition-all duration-200",
            !expandedFilters ? "hidden md:block" : "",
          )}
        >
          <div className="sticky top-6">
            <Card className="">
              <CardContent className="p-4">
                <div className="space-y-6">
                  <div>
                    <div className="relative">
                      <SearchIcon className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                      <Input
                        placeholder="Search properties"
                        className="pl-9"
                        value={filters.keyword}
                        onChange={(e) =>
                          handleFilterChange("keyword", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-medium">Property Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Card
                        className={cn(
                          "hover:bg-muted/50 cursor-pointer border p-2 transition-all",
                          filters.propertyType === "land" &&
                            "bg-primary/10 border-primary/50",
                        )}
                        onClick={() =>
                          handleFilterChange(
                            "propertyType",
                            filters.propertyType === "land" ? "" : "land",
                          )
                        }
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <Landmark
                            className={cn(
                              "mb-1 h-5 w-5",
                              filters.propertyType === "land"
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                          <span className="text-xs font-medium">Land</span>
                        </div>
                      </Card>

                      <Card
                        className={cn(
                          "hover:bg-muted/50 cursor-pointer border p-2 transition-all",
                          filters.propertyType === "farm" &&
                            "bg-primary/10 border-primary/50",
                        )}
                        onClick={() =>
                          handleFilterChange(
                            "propertyType",
                            filters.propertyType === "farm" ? "" : "farm",
                          )
                        }
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className={cn(
                              "mb-1 h-5 w-5",
                              filters.propertyType === "farm"
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          >
                            <path
                              d="M4 14C4 15.1046 3.10457 16 2 16V22H22V16C20.8954 16 20 15.1046 20 14V8C20 5.23858 17.7614 3 15 3H9C6.23858 3 4 5.23858 4 8V14Z"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 16V22"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M8 22L8 19"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M16 22L16 19"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <span className="text-xs font-medium">Farm</span>
                        </div>
                      </Card>

                      <Card
                        className={cn(
                          "hover:bg-muted/50 cursor-pointer border p-2 transition-all",
                          filters.propertyType === "flat" &&
                            "bg-primary/10 border-primary/50",
                        )}
                        onClick={() =>
                          handleFilterChange(
                            "propertyType",
                            filters.propertyType === "flat" ? "" : "flat",
                          )
                        }
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <Building
                            className={cn(
                              "mb-1 h-5 w-5",
                              filters.propertyType === "flat"
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                          <span className="text-xs font-medium">Flat</span>
                        </div>
                      </Card>

                      <Card
                        className={cn(
                          "hover:bg-muted/50 cursor-pointer border p-2 transition-all",
                          filters.propertyType === "house" &&
                            "bg-primary/10 border-primary/50",
                        )}
                        onClick={() =>
                          handleFilterChange(
                            "propertyType",
                            filters.propertyType === "house" ? "" : "house",
                          )
                        }
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <Home
                            className={cn(
                              "mb-1 h-5 w-5",
                              filters.propertyType === "house"
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                          <span className="text-xs font-medium">House</span>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-medium">Location</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {MAHARASHTRA_CITIES.map((city) => (
                        <Card
                          key={city.id}
                          className={cn(
                            "hover:bg-muted/50 cursor-pointer border p-2 transition-all",
                            filters.city === city.id &&
                              "bg-primary/10 border-primary/50",
                          )}
                          onClick={() => handleFilterChange("city", city.id)}
                        >
                          <div className="flex flex-col items-center justify-center text-center">
                            <span
                              className={cn(
                                "text-xs font-medium",
                                filters.city === city.id ? "text-primary" : "",
                              )}
                            >
                              {city.name}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-medium">Price Range</h3>
                    <div className="px-1">
                      <Slider
                        value={[filters.minPrice, filters.maxPrice]}
                        min={0}
                        max={50000000}
                        step={100000}
                        onValueChange={(values: number[]) => {
                          handleFilterChange("minPrice", values[0]);
                          handleFilterChange("maxPrice", values[1]);
                        }}
                      />
                      <div className="mt-2 flex justify-between text-xs">
                        <span>{formatPriceLabel(filters.minPrice)}</span>
                        <span>{formatPriceLabel(filters.maxPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Button
                      className="w-full"
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ScrollArea className="scrollbar mb-6 h-full md:h-auto">
          <div className="space-y-6">
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <PropertyCardSkeleton key={i} />
                  ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-muted/20 mt-10 flex flex-col items-center justify-center rounded-lg py-16 text-center">
                <SearchIcon className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-medium">
                  No properties found
                </h3>
                <p className="text-muted-foreground mb-4 max-w-md text-sm">
                  We couldn&apos;t find any properties matching your search
                  criteria. Try adjusting your filters or search for something
                  different.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
