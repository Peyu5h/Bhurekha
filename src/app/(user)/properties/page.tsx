"use client";

import React from "react";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Skeleton } from "~/components/ui/skeleton";
import { ScrollArea } from "~/components/ui/scroll-area";
import Link from "next/link";
import {
  Building2,
  FileText,
  Image as ImageIcon,
  MapPin,
  IndianRupee,
  ArrowRight,
  Plus,
} from "lucide-react";

const properties = [
  {
    id: "PRJ-2024-001",
    title: "Luxury Apartment in Shastri Nagar",
    address: "123, Shastri Nagar, Mumbai, Maharashtra 400001",
    type: "Residential",
    status: "ACTIVE",
    area: "1200 sq.ft",
    price: "₹1,25,00,000",
    documents: 8,
    photos: 12,
    lastUpdated: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    id: "PRJ-2024-002",
    title: "Commercial Space in Andheri East",
    address: "456, MIDC Industrial Area, Andheri East, Mumbai 400093",
    type: "Commercial",
    status: "SOLD",
    area: "2500 sq.ft",
    price: "₹2,50,00,000",
    documents: 6,
    photos: 8,
    lastUpdated: "2024-02-15",
    thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    id: "PRJ-2024-003",
    title: "Villa in Powai",
    address: "789, Hiranandani Gardens, Powai, Mumbai 400076",
    type: "Residential",
    status: "ACTIVE",
    area: "3000 sq.ft",
    price: "₹3,75,00,000",
    documents: 10,
    photos: 15,
    lastUpdated: "2024-03-05",
    thumbnail: "https://images.unsplash.com/photo-1549517045-bc93de075e53",
  },
];

const PropertyCard = ({ property }: { property: (typeof properties)[0] }) => {
  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="hover:border-primary/30 overflow-hidden p-0 transition-all hover:shadow-md">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={property.thumbnail}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{property.title}</CardTitle>
            <Badge
              variant={property.status === "ACTIVE" ? "default" : "secondary"}
            >
              {property.status}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {property.address}
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
              <p className="font-medium">{property.area}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Price</p>
              <p className="font-medium">{property.price}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Updated</p>
              <p className="font-medium">
                {new Date(property.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const PropertyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden p-0 pb-4">
      <Skeleton className="aspect-[16/9] w-full" />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Properties() {
  const { user } = useWalletAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-40" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Link href="/properties/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" className="mt-4">
        <TabsList>
          <TabsTrigger value="active">Active Properties</TabsTrigger>
          <TabsTrigger value="sold">Sold Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties
              .filter((p) => p.status === "ACTIVE")
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="sold" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties
              .filter((p) => p.status === "SOLD")
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
