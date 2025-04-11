"use client";

import React from "react";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  FileText,
  MapPin,
  IndianRupee,
  Calendar,
  ArrowLeft,
  Download,
  Upload,
  User,
  Send,
  Users,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  X,
  Check,
  CircleCheck,
  CircleDashed,
  Circle,
  BarChart3,
  Image as ImageIcon,
  FileType,
  Eye,
  Grid,
  List,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";

// Mapbox component
const MapBox = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border">
      <div className="bg-muted absolute inset-0">
        <iframe
          title="Property Location"
          width="100%"
          height="100%"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          className="absolute inset-0"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="absolute right-2 bottom-2">
        <Badge className="bg-background/80 backdrop-blur-sm">
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </Badge>
      </div>
    </div>
  );
};

// Simplified for the example
const propertyDetails = {
  id: "PRJ-2024-001",
  title: "Luxury Apartment in Shastri Nagar",
  address: "123, Shastri Nagar, Mumbai, Maharashtra 400001",
  type: "Residential",
  subType: "flat",
  status: "ACTIVE",
  area: "1200",
  unitOfMeasurement: "sqft",
  price: "₹1,25,00,000",
  acquisition: "private",
  yearBuilt: "2018",
  description:
    "Modern apartment with premium amenities and excellent location in the heart of Mumbai.",
  coordinates: {
    latitude: 19.075983,
    longitude: 72.877655,
  },
  legalDetails: {
    ownershipType: "freehold",
    titleDeedNumber: "DEED-2018-54321",
    surveyNumber: "S-123-456",
    propertyTaxPaid: true,
    taxPaidUntil: "2024-12-31",
    encumbrances: false,
    constructionApproved: true,
    naviSharat: false,
    juniSharat: false,
  },
  buildingDetails: {
    floors: "5",
    units: "40",
    amenities: ["Gym", "Swimming Pool", "24x7 Security"],
    parking: "2",
    furnished: "semi",
    condition: "ready_to_move",
    ageOfBuilding: "6",
    reraRegistered: true,
    reraNumber: "RERA-MH-12345",
    occupancyCertificate: true,
  },
  documents: [
    {
      id: 1,
      name: "Property Tax Receipt",
      date: "2024-03-10",
      status: "VERIFIED",
      size: "2.5 MB",
      type: "pdf",
      url: "https://example.com/documents/tax_receipt.pdf",
    },
    {
      id: 2,
      name: "Sale Agreement",
      date: "2024-03-08",
      status: "VERIFIED",
      size: "1.8 MB",
      type: "pdf",
      url: "https://example.com/documents/sale_agreement.pdf",
    },
    {
      id: 3,
      name: "Property Photos",
      date: "2024-03-05",
      status: "VERIFIED",
      size: "5.2 MB",
      type: "image",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      id: 4,
      name: "Floor Plan",
      date: "2024-03-03",
      status: "VERIFIED",
      size: "3.1 MB",
      type: "image",
      url: "https://example.com/documents/floor_plan.jpg",
    },
    {
      id: 5,
      name: "Title Deed",
      date: "2024-03-01",
      status: "VERIFIED",
      size: "4.3 MB",
      type: "pdf",
      url: "https://example.com/documents/title_deed.pdf",
    },
  ],
  photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      caption: "Front View",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1560449017-7c4e3be7a6b3",
      caption: "Living Room",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1560449017-7c4e3be7a6b4",
      caption: "Kitchen",
    },
  ],
  timeline: [
    { phase: "KYC_VERIFICATION", status: "COMPLETED", date: "2024-03-01" },
    { phase: "DOCUMENT_UPLOAD", status: "COMPLETED", date: "2024-03-05" },
    {
      phase: "DOCUMENT_VERIFICATION",
      status: "IN_PROGRESS",
      date: "2024-03-10",
    },
    { phase: "STAMP_DUTY_PAYMENT", status: "PENDING", date: null },
    { phase: "AGREEMENT_SIGNING", status: "PENDING", date: null },
  ],
  interestedBuyers: [
    {
      id: 1,
      name: "Ramesh Patel",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      status: "INTERESTED",
      lastActive: "2 hours ago",
      messages: [
        {
          id: 1,
          sender: "BUYER",
          text: "Hello, I'm interested in this property. Is it still available?",
          time: "2024-03-10T10:30:00",
        },
        {
          id: 2,
          sender: "SELLER",
          text: "Yes, it's available. Would you like to schedule a visit?",
          time: "2024-03-10T10:35:00",
        },
        {
          id: 3,
          sender: "BUYER",
          text: "That would be great. I'm available this weekend.",
          time: "2024-03-10T10:40:00",
        },
      ],
    },
    {
      id: 2,
      name: "Suresh Kumar",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      status: "NEGOTIATING",
      lastActive: "1 day ago",
      messages: [
        {
          id: 1,
          sender: "BUYER",
          text: "I'm interested in this property but the price seems high. Would you consider an offer of ₹1,15,00,000?",
          time: "2024-03-09T14:20:00",
        },
        {
          id: 2,
          sender: "SELLER",
          text: "Thank you for your interest. The lowest I can go is ₹1,20,00,000 given the location and amenities.",
          time: "2024-03-09T14:30:00",
        },
      ],
    },
    {
      id: 3,
      name: "Priya Sharma",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      status: "REJECTED",
      lastActive: "3 days ago",
      messages: [],
    },
  ],
};

const PropertyDetailsSkeleton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-1">
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-5 w-36" />
        </div>
        <Skeleton className="h-7 w-20" />
      </div>
      <div className="grid flex-1 grid-cols-1 gap-2 overflow-hidden p-2 md:grid-cols-3">
        <Skeleton className="aspect-square w-full rounded-lg md:col-span-1" />
        <div className="flex flex-col gap-2 md:col-span-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default function PropertyDetails({
  params,
}: {
  params: { id: string };
}) {
  const { user } = useWalletAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("details");
  const [activeBuyer, setActiveBuyer] = React.useState<number | null>(null);
  const [messageText, setMessageText] = React.useState("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedDocument, setSelectedDocument] = React.useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!messageText.trim() || activeBuyer === null) return;
    console.log(`Sending message to buyer ${activeBuyer}: ${messageText}`);
    setMessageText("");
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === propertyDetails.photos.length - 1 ? 0 : prev + 1,
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? propertyDetails.photos.length - 1 : prev - 1,
    );
  };

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      case "IN_PROGRESS":
        return <CircleDashed className="h-5 w-5 text-blue-500" />;
      case "PENDING":
        return <Circle className="h-5 w-5 text-gray-300" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  if (isLoading) {
    return <PropertyDetailsSkeleton />;
  }

  const DocumentItem = ({ document }: { document: any }) => {
    const isImage = document.type === "image";

    return (
      <div
        className="group cursor-pointer overflow-hidden rounded-lg border transition-all hover:shadow-md"
        onClick={() => {
          setSelectedDocument(document);
          document.dialogOpen = true;
        }}
      >
        {viewMode === "grid" ? (
          <div className="flex aspect-square flex-col">
            <div className="bg-muted/30 flex flex-1 items-center justify-center p-4">
              {isImage ? (
                <ImageIcon className="text-muted-foreground/50 h-10 w-10" />
              ) : (
                <FileType className="text-muted-foreground/50 h-10 w-10" />
              )}
            </div>
            <div className="bg-card p-3">
              <p className="truncate text-sm font-medium">{document.name}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-muted-foreground text-xs">
                  {document.size}
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hover:bg-muted/20 flex items-center p-3">
            <div className="bg-muted/30 flex h-10 w-10 items-center justify-center rounded">
              {isImage ? (
                <ImageIcon className="text-muted-foreground/70 h-5 w-5" />
              ) : (
                <FileType className="text-muted-foreground/70 h-5 w-5" />
              )}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <p className="truncate font-medium">{document.name}</p>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <span>{new Date(document.date).toLocaleDateString()}</span>
                <span>{document.size}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="ml-2 h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-auto flex-col p-4 md:max-h-screen md:overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => router.push("/properties")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="truncate text-lg font-bold">
            {propertyDetails.title}
          </h1>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl md:col-span-1 md:h-[calc(100vh-12%)]">
          <div className="flex h-full flex-col gap-6">
            <div className="relative min-h-80 w-full overflow-hidden rounded-xl">
              <img
                src={propertyDetails.photos[currentPhotoIndex].url}
                alt={propertyDetails.photos[currentPhotoIndex].caption}
                className="h-full w-full object-cover"
              />
              <div className="absolute right-3 bottom-3 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/80 h-8 w-8 rounded-full backdrop-blur-sm"
                  onClick={prevPhoto}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/80 h-8 w-8 rounded-full backdrop-blur-sm"
                  onClick={nextPhoto}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-3 left-3">
                <Badge
                  variant={
                    propertyDetails.status === "ACTIVE"
                      ? "default"
                      : "secondary"
                  }
                  className="text-sm"
                >
                  {propertyDetails.status}
                </Badge>
              </div>
            </div>

            <Card className="scrollbar flex overflow-auto p-0 py-4">
              <CardHeader className="mb-0 pb-0">
                <CardTitle className="my-0 py-0 text-sm">
                  Property Details
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                  <MapPin className="h-4 w-4" />
                  <span className="">{propertyDetails.address}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-0 space-y-2 pt-0 text-sm">
                {propertyDetails.description && (
                  <p className="text-muted-foreground text-xs">
                    {propertyDetails.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{propertyDetails.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Area</p>
                    <p className="font-medium">
                      {propertyDetails.area} {propertyDetails.unitOfMeasurement}
                    </p>
                  </div>

                  {propertyDetails.subType && (
                    <div>
                      <p className="text-muted-foreground">Sub Type</p>
                      <p className="font-medium">
                        {propertyDetails.subType.charAt(0).toUpperCase() +
                          propertyDetails.subType.slice(1)}
                      </p>
                    </div>
                  )}

                  {propertyDetails.yearBuilt && (
                    <div>
                      <p className="text-muted-foreground">Year Built</p>
                      <p className="font-medium">{propertyDetails.yearBuilt}</p>
                    </div>
                  )}

                  {propertyDetails.legalDetails?.ownershipType && (
                    <div>
                      <p className="text-muted-foreground">Ownership</p>
                      <p className="font-medium">
                        {propertyDetails.legalDetails.ownershipType
                          .charAt(0)
                          .toUpperCase() +
                          propertyDetails.legalDetails.ownershipType.slice(1)}
                      </p>
                    </div>
                  )}

                  {propertyDetails.buildingDetails && (
                    <div>
                      <p className="text-muted-foreground">Condition</p>
                      <p className="font-medium">
                        {propertyDetails.buildingDetails.condition
                          ?.split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ")}
                      </p>
                    </div>
                  )}
                </div>

                {propertyDetails.buildingDetails && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-muted-foreground mb-2 font-medium">
                      Building Details
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {propertyDetails.buildingDetails.floors && (
                        <div>
                          <p className="text-muted-foreground text-xs">Floor</p>
                          <p className="text-sm">
                            {propertyDetails.buildingDetails.floors}
                          </p>
                        </div>
                      )}

                      {propertyDetails.buildingDetails.units && (
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Total Units
                          </p>
                          <p className="text-sm">
                            {propertyDetails.buildingDetails.units}
                          </p>
                        </div>
                      )}

                      {propertyDetails.buildingDetails.parking && (
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Parking
                          </p>
                          <p className="text-sm">
                            {propertyDetails.buildingDetails.parking} spots
                          </p>
                        </div>
                      )}

                      {propertyDetails.buildingDetails.furnished && (
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Furnished
                          </p>
                          <p className="text-sm">
                            {propertyDetails.buildingDetails.furnished
                              .charAt(0)
                              .toUpperCase() +
                              propertyDetails.buildingDetails.furnished.slice(
                                1,
                              )}
                          </p>
                        </div>
                      )}
                    </div>

                    {propertyDetails.buildingDetails.amenities &&
                      propertyDetails.buildingDetails.amenities.length > 0 && (
                        <div className="mt-2">
                          <p className="text-muted-foreground text-xs">
                            Amenities
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {propertyDetails.buildingDetails.amenities.map(
                              (amenity, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {amenity}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-muted-foreground mb-2">Location</p>
                  <MapBox
                    latitude={propertyDetails.coordinates.latitude}
                    longitude={propertyDetails.coordinates.longitude}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden md:col-span-2 md:h-[calc(100vh-12%)]">
          <Tabs
            defaultValue="details"
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              if (value !== "interested") {
                setActiveBuyer(null);
              }
            }}
            className="flex h-full flex-col overflow-hidden"
          >
            <TabsList className="grid h-10 w-full grid-cols-4">
              <TabsTrigger value="details" className="text-sm">
                Timeline
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-sm">
                Documents
              </TabsTrigger>
              <TabsTrigger value="interested" className="text-sm">
                Interested
                <Badge variant="outline" className="ml-1 h-5 px-1 text-xs">
                  {propertyDetails.interestedBuyers.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="agreement" className="text-sm">
                Agreement
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="details"
              className="flex-1 overflow-hidden pt-4 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <Card className="flex-1 p-4">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">
                        Registration Timeline
                      </CardTitle>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-primary/5 text-primary text-sm"
                    >
                      {
                        propertyDetails.timeline.filter(
                          (p) => p.status === "COMPLETED",
                        ).length
                      }{" "}
                      / {propertyDetails.timeline.length} steps
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <div className="mb-4 flex w-full flex-col space-y-1">
                    <Progress value={35} className="h-3 rounded-full" />
                    <div className="text-muted-foreground flex justify-between text-sm">
                      <span>Start</span>
                      <span>In Progress</span>
                      <span>Complete</span>
                    </div>
                  </div>

                  <ScrollArea className="pt-4 pr-2">
                    <div className="relative pl-6">
                      <div className="space-y-6">
                        {propertyDetails.timeline.map((phase, index) => (
                          <div key={index} className="relative">
                            <div className="absolute -left-6 mt-0.5">
                              {getPhaseIcon(phase.status)}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center justify-between">
                                <span className="text-base font-medium">
                                  {phase.phase.replace(/_/g, " ")}
                                </span>
                                <Badge
                                  variant={
                                    phase.status === "COMPLETED"
                                      ? "default"
                                      : phase.status === "IN_PROGRESS"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="h-6 text-sm"
                                >
                                  {phase.status.replace(/_/g, " ")}
                                </Badge>
                              </div>
                              {phase.date && (
                                <span className="text-muted-foreground text-sm">
                                  {new Date(phase.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="documents"
              className="flex-1 overflow-hidden pt-4 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <Card className="flex-1 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      Property Documents
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[calc(100vh-45%)] overflow-auto">
                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {propertyDetails.documents.map((doc) => (
                          <DocumentItem key={doc.id} document={doc} />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1 rounded-md">
                        {propertyDetails.documents.map((doc) => (
                          <DocumentItem key={doc.id} document={doc} />
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Separate document dialog to improve performance */}
              {selectedDocument && (
                <Dialog
                  open={!!selectedDocument}
                  onOpenChange={(open) => !open && setSelectedDocument(null)}
                >
                  <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[80vw]">
                    <DialogHeader>
                      <DialogTitle>{selectedDocument.name}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {selectedDocument.type === "image" ? (
                        <img
                          src={selectedDocument.url}
                          alt={selectedDocument.name}
                          className="w-full rounded-md object-contain"
                          style={{ maxHeight: "70vh" }}
                        />
                      ) : (
                        <div className="bg-muted/20 flex aspect-[3/4] w-full items-center justify-center rounded-md border">
                          <div className="text-center">
                            <FileType className="text-muted-foreground/50 mx-auto h-16 w-16" />
                            <p className="mt-2 font-medium">
                              {selectedDocument.name}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {selectedDocument.size}
                            </p>
                            <Button className="mt-4" size="sm">
                              <Download className="mr-2 h-4 w-4" /> Download PDF
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>

            <TabsContent
              value="interested"
              className="flex-1 overflow-hidden pt-4 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="flex h-full overflow-hidden rounded-lg border">
                {/* Buyers List */}
                <div
                  className={`border-r ${
                    activeBuyer !== null ? "hidden md:block" : "w-full"
                  } md:w-48`}
                >
                  <div className="bg-muted/40 border-b p-3">
                    <p className="font-semibold">Interested Buyers</p>
                  </div>
                  <ScrollArea className="">
                    {propertyDetails.interestedBuyers.map((buyer) => (
                      <div
                        key={buyer.id}
                        onClick={() => setActiveBuyer(buyer.id)}
                        className={`hover:bg-muted/50 flex cursor-pointer items-center gap-2 border-b p-3 transition-colors ${
                          activeBuyer === buyer.id ? "bg-muted/60" : ""
                        }`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={buyer.avatarUrl} alt={buyer.name} />
                          <AvatarFallback className="text-sm">
                            {buyer.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <p className="truncate font-medium">{buyer.name}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground text-sm">
                              {buyer.lastActive}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                {/* Chat Area */}
                {activeBuyer !== null ? (
                  <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Chat Header */}
                    <div className="bg-muted/40 flex items-center justify-between border-b p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 md:hidden"
                          onClick={() => setActiveBuyer(null)}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              propertyDetails.interestedBuyers.find(
                                (b) => b.id === activeBuyer,
                              )?.avatarUrl
                            }
                            alt="User"
                          />
                          <AvatarFallback className="text-sm">
                            {propertyDetails.interestedBuyers
                              .find((b) => b.id === activeBuyer)
                              ?.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {
                              propertyDetails.interestedBuyers.find(
                                (b) => b.id === activeBuyer,
                              )?.name
                            }
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {
                              propertyDetails.interestedBuyers.find(
                                (b) => b.id === activeBuyer,
                              )?.status
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 px-3 text-sm"
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button size="sm" className="h-8 gap-1 px-3 text-sm">
                          <Check className="h-4 w-4" />
                          Accept
                        </Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-3">
                      <div className="space-y-3">
                        {(
                          propertyDetails.interestedBuyers.find(
                            (b) => b.id === activeBuyer,
                          )?.messages || []
                        ).map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender === "SELLER"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[85%] rounded-lg p-3 text-sm ${
                                message.sender === "SELLER"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p>{message.text}</p>
                              <p
                                className={`text-right text-xs ${
                                  message.sender === "SELLER"
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {new Date(message.time).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="border-t p-3">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="h-10 flex-1"
                        />
                        <Button
                          onClick={handleSendMessage}
                          size="icon"
                          className="h-10 w-10"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hidden flex-1 flex-col items-center justify-center md:flex">
                    <MessageSquare className="text-muted-foreground/50 mb-2 h-8 w-8" />
                    <p className="text-muted-foreground text-center text-sm">
                      Select a buyer to start chatting
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent
              value="agreement"
              className="flex-1 overflow-hidden pt-4 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <Card className="flex flex-1 flex-col p-4">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Sale Agreement</CardTitle>
                    <Badge variant="outline" className="h-6 px-2 text-sm">
                      Draft
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    Generate and manage the agreement
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center p-0">
                  <div className="bg-muted/30 rounded-lg border p-6 text-center">
                    <div className="mb-3 flex justify-center">
                      <FileCheck className="text-muted-foreground/50 h-10 w-10" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold">
                      No Agreement Created
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Select a buyer to generate an agreement
                    </p>
                    <Button
                      disabled
                      variant="outline"
                      size="sm"
                      className="h-9 gap-1 px-3 text-sm"
                    >
                      <Users className="h-4 w-4" />
                      Select Buyer First
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
