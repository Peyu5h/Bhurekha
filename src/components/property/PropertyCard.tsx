"use client";

import {
  Building,
  Home,
  IndianRupee,
  Landmark,
  MapPin,
  Ruler,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import Link from "next/link";

export interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: string;
    type: "land" | "farm" | "flat" | "house";
    subType?: string;
    area?: string;
    unitOfMeasurement?: string;
    district?: string;
    taluka?: string;
    village?: string;
    city?: string;
    address?: string;
    coordinates?: { lat: number; lng: number; address: string };
    buildingDetails?: {
      floors?: string;
      condition?: string;
      reraRegistered?: boolean;
    };
    legalDetails?: {
      ownershipType?: string;
      naviSharat?: boolean;
      juniSharat?: boolean;
    };
    landDetails?: {
      naClass?: string;
      waterSource?: string;
    };
    images?: string[];
    verified?: boolean;
  };
  variant?: "default" | "compact";
}

export function PropertyCard({
  property,
  variant = "default",
}: PropertyCardProps) {
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${numPrice.toLocaleString()}`;
    }
  };

  const getPropertyIcon = () => {
    switch (property.type) {
      case "land":
        return <Landmark className="h-5 w-5" />;
      case "farm":
        return (
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M4 14C4 15.1046 3.10457 16 2 16V22H22V16C20.8954 16 20 15.1046 20 14V8C20 5.23858 17.7614 3 15 3H9C6.23858 3 4 5.23858 4 8V14Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M12 16V22" stroke="currentColor" strokeWidth="2" />
            <path d="M8 22L8 19" stroke="currentColor" strokeWidth="2" />
            <path d="M16 22L16 19" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case "flat":
        return <Building className="h-5 w-5" />;
      case "house":
        return <Home className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  const getPropertyTypeLabel = () => {
    switch (property.type) {
      case "land":
        return "Land/Plot";
      case "farm":
        return "Farm";
      case "flat":
        return "Flat/Apartment";
      case "house":
        return "House/Villa";
      default:
        return "Property";
    }
  };

  const getLocationString = () => {
    if (property.city) {
      return `${property.city}, ${property.district || ""}`;
    } else if (property.village) {
      return `${property.village}, ${property.taluka || ""}, ${property.district || ""}`;
    } else {
      return property.address?.split(",").slice(0, 2).join(", ") || "";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="bg-muted relative aspect-[4/3] w-full">
        {property.images && property.images.length > 0 ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {getPropertyIcon()}
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm"
          >
            {getPropertyTypeLabel()}
          </Badge>
          {property.verified && (
            <Badge variant="default" className="bg-green-600">
              Verified
            </Badge>
          )}
        </div>
        <div className="absolute right-2 bottom-2">
          <Badge
            variant="outline"
            className="bg-background/80 backdrop-blur-sm"
          >
            {property.area} {property.unitOfMeasurement}
          </Badge>
        </div>
      </div>

      <CardContent className={cn("p-4", variant === "compact" && "p-3")}>
        <div className="mb-2 flex items-start justify-between">
          <h3
            className={cn(
              "line-clamp-1 font-medium",
              variant === "compact" ? "text-sm" : "text-base",
            )}
          >
            {property.title}
          </h3>
          <div className="text-primary flex items-center font-semibold">
            <IndianRupee className="mr-1 h-3 w-3" />
            <span
              className={cn(variant === "compact" ? "text-sm" : "text-base")}
            >
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <div className="text-muted-foreground flex items-center">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            <span className="line-clamp-1 text-xs">{getLocationString()}</span>
          </div>

          <div className="text-muted-foreground flex items-center">
            <Ruler className="mr-1 h-3.5 w-3.5" />
            <span className="text-xs">
              {property.area} {property.unitOfMeasurement}
            </span>
          </div>

          {property.buildingDetails?.condition && (
            <div className="text-xs">
              <span className="text-muted-foreground">Condition: </span>
              <span>
                {property.buildingDetails.condition
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </div>
          )}

          {property.landDetails?.naClass && (
            <div className="text-xs">
              <span className="text-muted-foreground">Status: </span>
              <span>
                {property.landDetails.naClass === "na_approved"
                  ? "NA Approved"
                  : property.landDetails.naClass === "na_in_process"
                    ? "NA in Process"
                    : "Agricultural"}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      {variant !== "compact" && (
        <CardFooter className="border-t p-4 pt-3">
          <div className="flex w-full gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
            <Button size="sm" className="flex-1">
              Inquire
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
