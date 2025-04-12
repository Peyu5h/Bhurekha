"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Search,
  Eye,
  Check,
  X,
  AlertTriangle,
  FileText,
  MapPin,
  User,
  Calendar,
  Building2,
  Building,
  IndianRupee,
  Landmark,
  ChevronRight,
  CheckCircle,
  XCircle,
  Home,
  FileCheck,
  Clock,
} from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { toast } from "sonner";
import { MapTemp } from "~/lib/map";

const MOCK_PROPERTIES = [
  {
    id: "PROP001",
    owner: {
      name: "Raj Sharma",
      address: "123 Main St, Mumbai",
      phone: "+91 98765 43210",
      email: "raj.sharma@example.com",
      wallet: "0x1234...5678",
      aadhaarVerified: true,
      panVerified: true,
    },
    property: {
      type: "land",
      title: "Residential Plot near Hinjewadi",
      area: "2400 sqft",
      price: "₹80,00,000",
      location: {
        district: "Pune",
        taluka: "Mulshi",
        village: "Hinjewadi",
        address: "Survey No. 123, Hinjewadi Phase 3, Pune",
        coordinates: {
          lat: 18.5912,
          lng: 73.738,
        },
      },
      details: {
        naviSharat: true,
        juniSharat: false,
        naClass: "na_approved",
      },
    },
    documents: [
      {
        type: "7/12 Extract",
        file: "/mock/docs/7-12-extract.pdf",
        uploaded: "2024-04-15",
        aiScore: 95,
        verified: false,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568057373484-69bbc440c02e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdW1lbnRzJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
      {
        type: "Property Tax Receipt",
        file: "/mock/docs/tax-receipt.pdf",
        uploaded: "2024-04-15",
        aiScore: 88,
        verified: false,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568057373189-8bf0cf6179e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
      {
        type: "Encumbrance Certificate",
        file: "/mock/docs/ec.pdf",
        uploaded: "2024-04-15",
        aiScore: 92,
        verified: false,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568124929262-d6272d42dbf5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
      {
        type: "NA Order",
        file: "/mock/docs/na-order.pdf",
        uploaded: "2024-04-15",
        aiScore: 87,
        verified: false,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568124929262-d6272d42dbf5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
    ],
    status: "pending",
    submittedOn: "2024-04-15",
    lastUpdated: "2024-04-15",
    aiOverallScore: 90,
    comments: [],
  },
  {
    id: "PROP002",
    owner: {
      name: "Priya Patel",
      address: "456 Park Ave, Mumbai",
      phone: "+91 87654 32109",
      email: "priya.patel@example.com",
      wallet: "0x9876...4321",
      aadhaarVerified: true,
      panVerified: true,
    },
    property: {
      type: "flat",
      title: "2BHK Apartment in Koregaon Park",
      area: "1200 sqft",
      price: "₹1,20,00,000",
      location: {
        district: "Pune",
        address: "Blue Ridge Society, Koregaon Park, Pune",
        coordinates: {
          lat: 18.5362,
          lng: 73.8941,
        },
      },
      details: {
        floors: "4",
        reraRegistered: true,
        condition: "ready_to_move",
      },
    },
    documents: [
      {
        type: "RERA Certificate",
        file: "/mock/docs/rera.pdf",
        uploaded: "2024-04-10",
        aiScore: 96,
        verified: true,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568057373484-69bbc440c02e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdW1lbnRzJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
      {
        type: "Property Tax Receipt",
        file: "/mock/docs/tax-receipt-2.pdf",
        uploaded: "2024-04-10",
        aiScore: 94,
        verified: true,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568124929262-d6272d42dbf5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
      {
        type: "Occupancy Certificate",
        file: "/mock/docs/oc.pdf",
        uploaded: "2024-04-10",
        aiScore: 91,
        verified: true,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568124929262-d6272d42dbf5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
      {
        type: "Society NOC",
        file: "/mock/docs/noc.pdf",
        uploaded: "2024-04-10",
        aiScore: 89,
        verified: true,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568057373189-8bf0cf6179e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
    ],
    status: "verified",
    submittedOn: "2024-04-10",
    lastUpdated: "2024-04-11",
    aiOverallScore: 92,
    comments: [
      {
        author: "SubRegistrar",
        text: "All documents verified and property record created.",
        timestamp: "2024-04-11",
      },
    ],
  },
  {
    id: "PROP003",
    owner: {
      name: "Anil Kumar",
      address: "789 Farm Road, Nashik",
      phone: "+91 76543 21098",
      email: "anil.kumar@example.com",
      wallet: "0x5432...7654",
      aadhaarVerified: true,
      panVerified: true,
    },
    property: {
      type: "farm",
      title: "Agricultural Land with Water Source",
      area: "2 acres",
      price: "₹50,00,000",
      location: {
        district: "Nashik",
        taluka: "Dindori",
        village: "Vani",
        address: "Gat No. 45, Vani, Dindori, Nashik",
        coordinates: {
          lat: 20.2013,
          lng: 73.8567,
        },
      },
      details: {
        naClass: "agricultural",
        waterSource: "borewell",
      },
    },
    documents: [
      {
        type: "7/12 Extract",
        file: "/mock/docs/7-12-extract-2.pdf",
        uploaded: "2024-04-05",
        aiScore: 85,
        verified: false,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568057373189-8bf0cf6179e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
      {
        type: "Land Tax Receipt",
        file: "/mock/docs/land-tax.pdf",
        uploaded: "2024-04-05",
        aiScore: 78,
        verified: false,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568057371698-84d5b4cda971?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
      {
        type: "Mutation Certificate",
        file: "/mock/docs/mutation.pdf",
        uploaded: "2024-04-05",
        aiScore: 62,
        verified: false,
        required: true,
        issues: ["Signature mismatch", "Incomplete information"],
        thumbnail:
          "https://images.unsplash.com/photo-1568057373484-69bbc440c02e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdW1lbnRzJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
    ],
    status: "rejected",
    submittedOn: "2024-04-05",
    lastUpdated: "2024-04-06",
    aiOverallScore: 75,
    comments: [
      {
        author: "SubRegistrar",
        text: "Mutation certificate has discrepancies. Please provide a valid document.",
        timestamp: "2024-04-06",
      },
    ],
  },
  {
    id: "PROP004",
    owner: {
      name: "Suresh Joshi",
      address: "25 Green View, Pune",
      phone: "+91 95432 10987",
      email: "suresh.joshi@example.com",
      wallet: "0x8765...1234",
      aadhaarVerified: true,
      panVerified: true,
    },
    property: {
      type: "land",
      title: "Commercial Plot in Pimpri",
      area: "3500 sqft",
      price: "₹2,50,00,000",
      location: {
        district: "Pune",
        taluka: "Pimpri-Chinchwad",
        village: "Pimpri",
        address: "Plot No. 78, MIDC Area, Pimpri, Pune",
        coordinates: {
          lat: 18.6298,
          lng: 73.7997,
        },
      },
      details: {
        naviSharat: false,
        juniSharat: true,
        naClass: "na_approved",
      },
    },
    documents: [
      {
        type: "7/12 Extract",
        file: "/mock/docs/7-12-extract-3.pdf",
        uploaded: "2024-04-12",
        aiScore: 93,
        verified: false,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568057373189-8bf0cf6179e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
      {
        type: "Property Tax Receipt",
        file: "/mock/docs/tax-receipt-3.pdf",
        uploaded: "2024-04-12",
        aiScore: 91,
        verified: false,
        required: true,
        thumbnail:
          "https://images.unsplash.com/photo-1568124929262-d6272d42dbf5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
      },
    ],
    status: "pending",
    submittedOn: "2024-04-12",
    lastUpdated: "2024-04-12",
    aiOverallScore: 92,
    comments: [],
  },
];

export default function AuthorityVerifications() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<any>(
    MOCK_PROPERTIES[0],
  );
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [documentStatus, setDocumentStatus] = useState<Record<string, boolean>>(
    {},
  );

  const filteredProperties = MOCK_PROPERTIES.filter((property) => {
    if (filter !== "all" && property.status !== filter) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        property.id.toLowerCase().includes(query) ||
        property.owner.name.toLowerCase().includes(query) ||
        property.property.location.address.toLowerCase().includes(query) ||
        property.property.title.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleViewProperty = (property: any) => {
    setSelectedProperty(property);
    const initialStatus: Record<string, boolean> = {};
    property.documents.forEach((doc: any) => {
      initialStatus[doc.type] = doc.verified || false;
    });
    setDocumentStatus(initialStatus);
  };

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setDocumentDialogOpen(true);
  };

  const handleVerifyDocument = (docId: string) => {
    setDocumentStatus((prev) => ({ ...prev, [docId]: true }));
    const updatedProperty = { ...selectedProperty };
    const docIndex = updatedProperty.documents.findIndex(
      (d: any) => d.type === docId,
    );
    if (docIndex !== -1) {
      updatedProperty.documents[docIndex].verified = true;
    }
    setSelectedProperty(updatedProperty);

    toast.success(`${docId} verified successfully`);
    setDocumentDialogOpen(false);
  };

  const handleRejectDocument = (docId: string, reason: string = "") => {
    setDocumentStatus((prev) => ({ ...prev, [docId]: false }));
    const updatedProperty = { ...selectedProperty };
    const docIndex = updatedProperty.documents.findIndex(
      (d: any) => d.type === docId,
    );
    if (docIndex !== -1) {
      updatedProperty.documents[docIndex].verified = false;
      if (reason) {
        if (!updatedProperty.documents[docIndex].issues) {
          updatedProperty.documents[docIndex].issues = [];
        }
        updatedProperty.documents[docIndex].issues.push(reason);
      }
    }
    setSelectedProperty(updatedProperty);

    toast.error(`${docId} rejected`);
    if (documentDialogOpen) {
      setDocumentDialogOpen(false);
    }
  };

  const allDocumentsVerified = () => {
    if (!selectedProperty?.documents?.length) return false;

    return selectedProperty.documents.every(
      (doc: any) => documentStatus[doc.type] || doc.verified,
    );
  };

  const handleApproveProperty = () => {
    if (!allDocumentsVerified()) {
      toast.warning("Please verify all documents first");
      return;
    }
    const updatedProperty = { ...selectedProperty, status: "verified" };
    setSelectedProperty(updatedProperty);
    const propertyIndex = MOCK_PROPERTIES.findIndex(
      (p) => p.id === selectedProperty.id,
    );
    if (propertyIndex !== -1) {
      MOCK_PROPERTIES[propertyIndex] = updatedProperty;
    }

    toast.success("Property verified and NFT minted successfully!");
  };

  const handleRejectProperty = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    const updatedProperty = {
      ...selectedProperty,
      status: "rejected",
      comments: [
        ...(selectedProperty.comments || []),
        {
          author: "Authority",
          text: rejectionReason,
          timestamp: new Date().toISOString().split("T")[0],
        },
      ],
    };
    setSelectedProperty(updatedProperty);

    const propertyIndex = MOCK_PROPERTIES.findIndex(
      (p) => p.id === selectedProperty.id,
    );
    if (propertyIndex !== -1) {
      MOCK_PROPERTIES[propertyIndex] = updatedProperty;
    }

    setRejectDialogOpen(false);
    setRejectionReason("");
    toast.error("Property rejected");
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "land":
        return <Landmark className="h-5 w-5" />;
      case "flat":
        return <Building className="h-5 w-5" />;
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
      case "house":
        return <Home className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-600/60 bg-yellow-600/20 text-xs text-yellow-800"
          >
            Pending
          </Badge>
        );
      case "verified":
        return (
          <Badge
            variant="outline"
            className="border-green-600/60 bg-green-600/20 text-xs text-green-800"
          >
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="border-red-600/60 bg-red-600/20 text-xs text-red-800"
          >
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b p-6">
        <h1 className="text-2xl font-bold">Property Verifications</h1>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search properties..."
              className="w-[200px] pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-[30%] border-r">
          <ScrollArea className="h-[calc(100vh-81px)]">
            <div className="space-y-4 p-4">
              {filteredProperties.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <AlertTriangle className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-medium">
                    No properties found
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilter("all");
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <>
                  {filteredProperties.map((property) => (
                    <Card
                      key={property.id}
                      className={`hover:border-primary/30 cursor-pointer overflow-hidden transition-all ${selectedProperty?.id === property.id ? "border-primary/50" : ""}`}
                      onClick={() => handleViewProperty(property)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getPropertyTypeIcon(property.property.type)}
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">
                                  {property.id}
                                </CardTitle>
                                {getStatusBadge(property.status)}
                              </div>
                              <CardDescription className="line-clamp-1 text-xs">
                                {property.property.title}
                              </CardDescription>
                            </div>
                          </div>
                          <ChevronRight className="text-muted-foreground h-4 w-4" />
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-1">
                          <div className="flex items-start gap-1">
                            <User className="text-muted-foreground mt-0.5 h-3 w-3" />
                            <p className="line-clamp-1 text-xs font-medium">
                              {property.owner.name}
                            </p>
                          </div>
                          <div className="flex items-start gap-1">
                            <MapPin className="text-muted-foreground mt-0.5 h-3 w-3" />
                            <p className="line-clamp-1 text-xs">
                              {property.property.location.address}
                            </p>
                          </div>
                          <div className="text-muted-foreground flex justify-between pt-1 text-xs">
                            <span>Submitted: {property.submittedOn}</span>
                            <span>{property.documents.length} Docs</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right panel*/}
        <div className="flex w-[70%] flex-col">
          {selectedProperty ? (
            <div className="flex h-[calc(100vh-81px)] flex-col">
              <div className="flex justify-between border-b">
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="bg-primary/10 rounded p-2">
                      {getPropertyTypeIcon(selectedProperty.property.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">
                          {selectedProperty.id}
                        </h2>
                        {getStatusBadge(selectedProperty.status)}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {selectedProperty.property.type
                          .charAt(0)
                          .toUpperCase() +
                          selectedProperty.property.type.slice(1)}{" "}
                        - {selectedProperty.property.area}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium">
                    {selectedProperty.property.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedProperty.property.location.address}
                  </p>
                </div>

                <div className="p-4">
                  <Card>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <p className="text-sm">Overall Score</p>
                          <p className="text-sm font-semibold">
                            {selectedProperty.aiOverallScore}%
                          </p>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className={`h-2 rounded-full ${getScoreColor(selectedProperty.aiOverallScore)}`}
                            style={{
                              width: `${selectedProperty.aiOverallScore}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {selectedProperty.aiOverallScore > 85
                            ? "Documents appear valid and authentic"
                            : selectedProperty.aiOverallScore > 70
                              ? "Some documents need verification"
                              : "Documents require review"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* right panel - Info */}
                <div className="w-1/3 border-r p-4">
                  <div>
                    <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
                      OWNER INFORMATION
                    </h3>
                    <Card className="p-3">
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="text-muted-foreground h-4 w-4" />
                          <div>
                            <p className="text-sm font-medium">
                              {selectedProperty.owner.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {selectedProperty.owner.email}
                            </p>
                          </div>
                        </div>
                        <p className="ml-4 text-xs">
                          {selectedProperty.owner.phone}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Area info */}
                  <div className="mt-4">
                    <Card className="p-3">
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Area
                            </p>
                            <p className="text-sm font-medium">
                              {selectedProperty.property.area}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Price
                            </p>
                            <p className="text-sm font-medium">
                              {selectedProperty.property.price}
                            </p>
                          </div>
                          {selectedProperty.property.location.district && (
                            <div>
                              <p className="text-muted-foreground text-xs">
                                District
                              </p>
                              <p className="text-sm">
                                {selectedProperty.property.location.district}
                              </p>
                            </div>
                          )}
                          {selectedProperty.property.location.taluka && (
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Taluka
                              </p>
                              <p className="text-xs">
                                {selectedProperty.property.location.taluka}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Property Map */}
                  <div className="mt-4">
                    <div className="h-[200px]">
                      <MapTemp
                        latitude={
                          selectedProperty.property.location.coordinates.lat
                        }
                        longitude={
                          selectedProperty.property.location.coordinates.lng
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Document Verification */}
                <div className="scrollbar w-2/3 overflow-auto p-4">
                  <div>
                    <h3 className="text-muted-foreground mb-2 text-sm font-semibold">
                      DOCUMENT VERIFICATION
                    </h3>
                    <p className="mb-4 text-xs">
                      Each document must be verified individually before final
                      approval
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {selectedProperty.documents.map(
                        (doc: any, index: number) => (
                          <Card key={index} className="overflow-hidden pt-0">
                            <div
                              className="relative aspect-video h-40 cursor-pointer"
                              onClick={() => handleViewDocument(doc)}
                            >
                              <img
                                src={doc.thumbnail}
                                alt={doc.type}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                                <Eye className="h-8 w-8 text-white" />
                              </div>
                              <div className="absolute top-2 right-2">
                                {documentStatus[doc.type] || doc.verified ? (
                                  <Badge
                                    variant="outline"
                                    className="border-green-600/60 bg-green-600/20 text-xs text-green-800"
                                  >
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="border-yellow-600/60 bg-yellow-600/20 text-xs text-yellow-800"
                                  >
                                    Pending
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <CardContent className="space-y-2 p-3">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">
                                  {doc.type}
                                </p>
                                <div className="flex items-center gap-1">
                                  <span
                                    className={`h-2 w-2 rounded-full ${getScoreColor(doc.aiScore)}`}
                                  ></span>
                                  <span className="text-xs font-medium">
                                    {doc.aiScore}%
                                  </span>
                                </div>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-gray-200">
                                <div
                                  className={`h-1.5 rounded-full ${getScoreColor(doc.aiScore)}`}
                                  style={{ width: `${doc.aiScore}%` }}
                                ></div>
                              </div>

                              {!(documentStatus[doc.type] || doc.verified) && (
                                <div className="mt-2 flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 flex-1 border-red-600/30 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRejectDocument(doc.type);
                                    }}
                                  >
                                    <X className="mr-1 h-3 w-3" />
                                    Reject
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-8 flex-1 bg-green-600 text-xs hover:bg-green-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleVerifyDocument(doc.type);
                                    }}
                                  >
                                    <Check className="mr-1 h-3 w-3" />
                                    Verify
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Final Approval */}
                  <div className="mt-6">
                    <Card className="border-dashed">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 rounded-full p-3">
                            <FileCheck className="text-primary h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-1 text-base font-medium">
                              Final Verification
                            </h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                              After verifying all documents, you can approve or
                              reject this property
                            </p>

                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="mb-1 flex items-center justify-between">
                                  <span className="text-sm">
                                    Document Verification Progress
                                  </span>
                                  <span className="text-sm font-medium">
                                    {
                                      selectedProperty.documents.filter(
                                        (d: any) =>
                                          documentStatus[d.type] || d.verified,
                                      ).length
                                    }
                                    /{selectedProperty.documents.length}
                                  </span>
                                </div>
                                <div className="bg-primary h-2 w-full rounded-full">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (selectedProperty.documents.filter(
                                          (d: any) =>
                                            documentStatus[d.type] ||
                                            d.verified,
                                        ).length /
                                          selectedProperty.documents.length) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex justify-end gap-2 border-t p-4">
                <Button
                  variant="outline"
                  className="border-red-600/30 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => setRejectDialogOpen(true)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject Property
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleApproveProperty}
                  disabled={!allDocumentsVerified()}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Verify & Mint NFT
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <AlertTriangle className="text-muted-foreground mb-4 h-10 w-10" />
              <h3 className="mb-2 text-lg font-medium">No property selected</h3>
              <p className="text-muted-foreground text-sm">
                Select a property from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Doc viewer dialog */}
      {selectedDocument && (
        <Dialog open={documentDialogOpen} onOpenChange={setDocumentDialogOpen}>
          <DialogContent className="mix-w-full p-0">
            <div className="border-b p-4">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {selectedDocument.type}
              </DialogTitle>
              <DialogDescription className="flex justify-between">
                <span>Uploaded on {selectedDocument.uploaded}</span>
                <span className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${getScoreColor(selectedDocument.aiScore)}`}
                  ></span>
                  AI Score: {selectedDocument.aiScore}%
                </span>
              </DialogDescription>
            </div>

            <div className="flex h-[75vh]">
              <div className="w-2/3 border-r">
                <div className="relative h-full bg-black/5">
                  <div className="absolute inset-0 flex justify-center">
                    <img
                      src={selectedDocument.thumbnail}
                      alt={selectedDocument.type}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/3 overflow-y-auto p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">AI Analysis</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-base">Authenticity Score</p>
                          <p className="text-xl font-bold">
                            {selectedDocument.aiScore}%
                          </p>
                        </div>
                        <div className="h-3 w-full rounded-full bg-gray-200">
                          <div
                            className={`h-3 rounded-full ${getScoreColor(selectedDocument.aiScore)}`}
                            style={{ width: `${selectedDocument.aiScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-base font-medium">AI Summary</p>
                        <p className="text-muted-foreground text-sm">
                          {selectedDocument.aiScore > 85
                            ? "The document appears to be authentic and valid with properly verified signatures and timestamps. All required fields are present and correctly formatted."
                            : selectedDocument.aiScore > 70
                              ? "The document requires additional verification. Some fields or signatures may need further review by the authority."
                              : "The document may have significant issues or inconsistencies that require detailed human verification and possibly resubmission."}
                        </p>
                      </div>

                      {selectedDocument.issues && (
                        <div className="rounded border border-red-500/30 bg-red-50 p-4">
                          <p className="mb-2 text-sm font-medium text-red-700">
                            Issues detected:
                          </p>
                          <ul className="list-inside list-disc text-sm text-red-600">
                            {selectedDocument.issues.map(
                              (issue: string, i: number) => (
                                <li key={i}>{issue}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Verification</h3>
                    {!(
                      documentStatus[selectedDocument.type] ||
                      selectedDocument.verified
                    ) ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertTriangle className="h-5 w-5" />
                          <p className="font-medium">Pending Verification</p>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <Button
                            variant="outline"
                            className="flex-1 border-red-600/30 text-red-600 hover:bg-red-50 hover:text-red-700"
                            size="lg"
                            onClick={() =>
                              handleRejectDocument(selectedDocument.type)
                            }
                          >
                            <XCircle className="mr-2 h-5 w-5" />
                            Reject Document
                          </Button>
                          <Button
                            variant="default"
                            size="lg"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() =>
                              handleVerifyDocument(selectedDocument.type)
                            }
                          >
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Verify Document
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-green-600">
                        <CheckCircle className="h-6 w-6" />
                        <div>
                          <p className="text-lg font-medium">
                            Document Verified
                          </p>
                          <p className="text-muted-foreground text-sm">
                            This document has been verified by authority
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Property</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this property.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <textarea
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectProperty}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
