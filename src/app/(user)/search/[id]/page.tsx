"use client";

import React, { useState } from "react";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Building,
  IndianRupee,
  Send,
  Ruler,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";

const propertyDetails = {
  id: "PRJ-2024-001",
  title: "Luxury Apartment in Shastri Nagar",
  address: "123, Shastri Nagar, Mumbai, Maharashtra 400001",
  type: "Residential",
  subType: "flat",
  area: "1200",
  unitOfMeasurement: "sqft",
  price: "₹1,25,00,000",
  description:
    "Modern apartment with premium amenities including 24/7 security, swimming pool, gym, and children's play area. The apartment features 3 bedrooms, 2 bathrooms, a spacious living room, modern kitchen, and a balcony with city views.",
  photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      caption: "Front View",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1549517045-bc93de075e53",
      caption: "Living Room",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1560449017-7c4e3be7a6b3",
      caption: "Kitchen",
    },
  ],
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
      name: "Floor Plan",
      date: "2024-03-03",
      status: "VERIFIED",
      size: "3.1 MB",
      type: "image",
      url: "https://example.com/documents/floor_plan.jpg",
    },
  ],
  coordinates: {
    latitude: 19.076,
    longitude: 72.8777,
  },
  messages: [
    {
      id: 1,
      sender: "BUYER",
      text: "Is this property still available?",
      timestamp: "2024-05-15T10:30:00Z",
    },
    {
      id: 2,
      sender: "SELLER",
      text: "Yes, it is available. Would you like to schedule a viewing?",
      timestamp: "2024-05-15T11:15:00Z",
    },
    {
      id: 3,
      sender: "BUYER",
      text: "Yes, I would. Are you available this weekend?",
      timestamp: "2024-05-15T11:30:00Z",
    },
  ],
  sellerAccepted: false,
};

export default function PropertyDetailsForBuyer({
  params,
}: {
  params: { id: string };
}) {
  const { user } = useWalletAuth();
  const router = useRouter();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [messageText, setMessageText] = useState("");

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

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    console.log(`Sending message: ${messageText}`);
    setMessageText("");
  };

  return (
    <div className="flex h-auto flex-col p-4 md:max-h-screen md:overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => router.push("/search")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="truncate text-lg font-bold">
            {propertyDetails.title}
          </h1>
        </div>
        <Badge variant="outline" className="px-2 py-1">
          {propertyDetails.type} - {propertyDetails.subType}
        </Badge>
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
              <div className="bg-background/80 absolute bottom-3 left-3 rounded-md px-2 py-1 backdrop-blur-sm">
                <p className="text-xs">
                  {currentPhotoIndex + 1} of {propertyDetails.photos.length}
                </p>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Property Details</CardTitle>
                <CardDescription>{propertyDetails.address}</CardDescription>
              </CardHeader>
              <CardContent className="mt-0 space-y-2 pt-0 text-sm">
                <p className="text-muted-foreground text-xs">
                  {propertyDetails.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
                  <div className="flex items-center">
                    <IndianRupee className="text-muted-foreground mr-2 h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Price</p>
                      <p className="font-medium">{propertyDetails.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="text-muted-foreground mr-2 h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Area</p>
                      <p className="font-medium">
                        {propertyDetails.area}{" "}
                        {propertyDetails.unitOfMeasurement}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building className="text-muted-foreground mr-2 h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Type</p>
                      <p className="font-medium">{propertyDetails.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Location</p>
                      <p className="font-medium">Mumbai</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden md:col-span-2 md:h-[calc(100vh-12%)]">
          <Tabs
            defaultValue="details"
            className="flex h-full flex-col overflow-hidden"
          >
            <TabsList className="grid h-10 w-full grid-cols-4">
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="agreement">Agreement</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="flex-1 overflow-auto pt-4">
              <Card className="h-full overflow-auto">
                <CardHeader>
                  <CardTitle>Detailed Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold">Description</h3>
                    <p>{propertyDetails.description}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Location</h3>
                    <div className="bg-muted flex h-48 w-full items-center justify-center rounded-md">
                      <MapPin className="mr-2" />
                      <span>Map View ({propertyDetails.address})</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">All Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {propertyDetails.photos.map((photo, index) => (
                        <div
                          key={photo.id}
                          className="aspect-video cursor-pointer overflow-hidden rounded-md"
                          onClick={() => setCurrentPhotoIndex(index)}
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="documents"
              className="flex-1 overflow-auto pt-4"
            >
              <Card className="h-full overflow-auto">
                <CardHeader>
                  <CardTitle>Property Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {propertyDetails.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-md border p-3"
                      >
                        <div className="flex items-center">
                          <FileText className="text-muted-foreground mr-3 h-5 w-5" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-muted-foreground text-xs">
                                {doc.date}
                              </p>
                              <Badge
                                variant="outline"
                                className="px-1 py-0 text-xs"
                              >
                                {doc.status}
                              </Badge>
                              <p className="text-muted-foreground text-xs">
                                {doc.size}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 overflow-hidden pt-4">
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>Chat with Seller</CardTitle>
                </CardHeader>
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4">
                    {propertyDetails.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "BUYER" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === "BUYER"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="mt-1 text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <CardFooter className="border-t p-4">
                  <div className="flex w-full gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="resize-none"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent
              value="agreement"
              className="flex-1 overflow-auto pt-4"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Agreement</CardTitle>
                </CardHeader>
                <CardContent className="flex h-[calc(100%-8rem)] flex-col items-center justify-center">
                  {propertyDetails.sellerAccepted ? (
                    <div className="space-y-4 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 p-4 text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">
                        Seller has accepted your interest!
                      </h3>
                      <p className="text-muted-foreground">
                        You can now proceed with the agreement.
                      </p>
                      <Button className="mt-4">View Agreement Details</Button>
                    </div>
                  ) : (
                    <div className="space-y-4 text-center">
                      <div className="text-muted-foreground bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full p-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">
                        Waiting for seller response
                      </h3>
                      <p className="text-muted-foreground">
                        The seller hasn&apos;t accepted your interest yet.
                        You&apos;ll be notified when they do.
                      </p>
                      <Button variant="outline" className="mt-4">
                        Contact Seller
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
