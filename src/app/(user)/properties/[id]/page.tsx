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
  FileSignature,
  Handshake,
  Clock,
  CalendarRange,
  UserCheck,
  RefreshCw,
  Lock,
  CreditCard,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { MapTemp } from "~/lib/map";
import { toast } from "sonner";
import { Separator } from "~/components/ui/separator";

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
      url: "https://images.unsplash.com/photo-1720481811085-711f224178ee?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Front View",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1617978241112-898785df45b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Living Room",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1669103148197-539672dbdeff?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Kitchen",
    },
  ],
  timeline: [
    { phase: "ADDED_PROPERTY", status: "COMPLETED", date: "2024-03-01" },
    { phase: "DOCUMENT_UPLOAD", status: "COMPLETED", date: "2024-03-05" },
    {
      phase: "DOCUMENT_VERIFICATION",
      status: "IN_PROGRESS",
      date: "2024-03-10",
    },
    { phase: "PROPERTY_LISTED", status: "PENDING", date: null },
    { phase: "STAMP_DUTY_PAYMENT", status: "PENDING", date: null },
    { phase: "AGREEMENT_SIGNING", status: "PENDING", date: null },
  ],
  interestedBuyers: [
    {
      id: 1,
      name: "Ramesh Patel",
      avatarUrl:
        "https://images.unsplash.com/photo-1638368349569-e49499196d9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhbiUyMG1lbiUyMHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
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
      avatarUrl:
        "https://images.unsplash.com/photo-1645036915593-b4ed7e016b65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMG1lbiUyMHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
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
      name: "Prayag Sharma",
      avatarUrl:
        "https://images.unsplash.com/photo-1739958742515-6fe41e461664?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGluZGlhbiUyMG1lbiUyMHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
      status: "REJECTED",
      lastActive: "3 days ago",
      messages: [],
    },
  ],
  agreementStatus: "PENDING",
  agreementInfo: {
    deedId: "DEED-2024-05-12345",
    generatedDate: "2024-05-16T10:30:00Z",
    registrationDate: null,
    registrationVenue: null,
    tokenAmount: "₹5,00,000",
    paymentStatus: "PENDING",
  },
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
  const [isGeneratingDeed, setIsGeneratingDeed] = React.useState(false);
  const [hasApprovedDeed, setHasApprovedDeed] = React.useState(false);
  const [selectedBuyer, setSelectedBuyer] = React.useState<number | null>(null);
  const [isAgreementTab, setIsAgreementTab] = React.useState(false);
  const [showDemoControls, setShowDemoControls] = React.useState(false);
  const [demoAgreementStatus, setDemoAgreementStatus] = React.useState(
    propertyDetails.agreementStatus,
  );
  const [demoPaymentStatus, setDemoPaymentStatus] = React.useState(
    propertyDetails.agreementInfo.paymentStatus,
  );

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

  const handleSelectBuyer = (buyerId: number) => {
    if (activeTab === "interested") {
      setSelectedBuyer(buyerId);
      toast.success(
        `You have selected ${propertyDetails.interestedBuyers.find((b) => b.id === buyerId)?.name} as the buyer for this property.`,
      );
    }
  };

  const approveDeed = () => {
    setHasApprovedDeed(true);
    setDemoAgreementStatus("SELLER_APPROVED");
    toast.success(
      `You have approved the sales deed. Waiting for buyer to make payment`,
    );
  };

  const generateSalesDeed = () => {
    setIsGeneratingDeed(true);
    setTimeout(() => {
      setIsGeneratingDeed(false);
      setDemoAgreementStatus("GENERATED");
      toast.success(`Sales Deed Generated`);
    }, 2000);
  };

  const simulateBuyerApproval = () => {
    setDemoAgreementStatus("BUYER_APPROVED");
    toast.success("Buyer Approved");
  };

  const simulatePayment = () => {
    setDemoPaymentStatus("COMPLETED");
    setDemoAgreementStatus("COMPLETED");
    propertyDetails.agreementInfo.registrationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();
    propertyDetails.agreementInfo.registrationVenue =
      "Sub-Registrar Office, Mumbai Central";
    toast.success(`Payment Received`);
  };

  React.useEffect(() => {
    if (activeTab === "agreement") {
      setIsAgreementTab(true);
    } else {
      setIsAgreementTab(false);
    }
  }, [activeTab]);

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

  const renderAgreementContent = () => {
    if (selectedBuyer === null) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
          <div className="text-muted-foreground/60 mb-4">
            <UserCheck className="mx-auto h-16 w-16" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Select a Buyer First</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Please go to the &quot;Interested&quot; tab and select a buyer to
            proceed with the agreement. Once you select a buyer, you&apos;ll see
            the sales deed generated by the buyer.
          </p>
          <Button
            variant="outline"
            onClick={() => setActiveTab("interested")}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            View Interested Buyers
          </Button>
        </div>
      );
    }

    if (demoAgreementStatus === "PENDING") {
      const buyer = propertyDetails.interestedBuyers.find(
        (b) => b.id === selectedBuyer,
      );

      return (
        <div className="flex flex-1 flex-col">
          <div className="bg-muted/30 mb-6 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={buyer?.avatarUrl} alt={buyer?.name} />
                <AvatarFallback>{buyer?.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{buyer?.name}</h3>
                <p className="text-muted-foreground text-sm">Selected Buyer</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-muted-foreground text-xs">
                    Last active: {buyer?.lastActive}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
            <div className="text-muted-foreground/60 mb-4">
              <FileText className="mx-auto h-16 w-16" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              Waiting for Buyer to Generate Sales Deed
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              You have selected {buyer?.name} as the buyer for this property.
              Once they generate a sales deed, you will be able to review and
              approve it.
            </p>
          </div>
        </div>
      );
    }

    const buyer = propertyDetails.interestedBuyers.find(
      (b) => b.id === selectedBuyer,
    );

    const propertyValue = parseInt(propertyDetails.price.replace(/[₹,]/g, ""));
    const stampDutyPercentage = 5;
    const registrationFee = Math.min(propertyValue * 0.01, 30000);

    const stampDutyAmount = propertyValue * (stampDutyPercentage / 100);
    const formattedStampDuty = `₹${stampDutyAmount.toLocaleString()}`;
    const formattedRegistrationFee = `₹${registrationFee.toLocaleString()}`;
    const totalFees = stampDutyAmount + registrationFee;
    const formattedTotalFees = `₹${totalFees.toLocaleString()}`;

    const content = (
      <div className="flex h-full flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant={
                demoAgreementStatus === "COMPLETED" ? "default" : "secondary"
              }
              className="px-2 py-1.5"
            >
              {demoAgreementStatus === "GENERATED" && "Waiting for Approval"}
              {demoAgreementStatus === "BUYER_APPROVED" && "Buyer Approved"}
              {demoAgreementStatus === "SELLER_APPROVED" && "You Approved"}
              {demoAgreementStatus === "COMPLETED" && "Agreement Completed"}
            </Badge>
            <p className="text-muted-foreground text-sm">
              Deed ID: {propertyDetails.agreementInfo.deedId}
            </p>
          </div>
          <Button size="sm" variant="outline" className="gap-1">
            <FileText className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                Your Information (Seller)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Avatar className="mr-3 h-10 w-10">
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Current Owner</p>
                  <p className="text-muted-foreground text-xs">
                    +91 9876543210
                  </p>
                  <p className="text-muted-foreground text-xs">
                    seller@example.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Buyer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Avatar className="mr-3 h-10 w-10">
                  <AvatarImage src={buyer?.avatarUrl} alt={buyer?.name} />
                  <AvatarFallback>{buyer?.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{buyer?.name}</p>
                  <p className="text-muted-foreground text-xs">
                    +91 9876543210
                  </p>
                  <p className="text-muted-foreground text-xs">
                    buyer@example.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5" />
              Sales Deed
            </CardTitle>
            <CardDescription>
              Generated on{" "}
              {new Date(
                propertyDetails.agreementInfo.generatedDate,
              ).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-56 rounded-md border p-4 md:h-64">
              <div className="space-y-4 text-sm">
                <h3 className="text-center text-lg font-bold">SALE DEED</h3>

                <p>
                  THIS DEED OF SALE is made and executed on this{" "}
                  {new Date().toLocaleDateString()} between:
                </p>

                <p className="font-medium">
                  Current Owner, residing at [Seller Address], hereinafter
                  called the &quot;SELLER&quot; of the ONE PART,
                </p>

                <p>AND</p>

                <p className="font-medium">
                  {buyer?.name}, residing at [Buyer Address], hereinafter called
                  the &quot;BUYER&quot; of the OTHER PART.
                </p>

                <p className="font-medium">WHEREAS:</p>

                <p>
                  The SELLER is the absolute and rightful owner of property
                  located at {propertyDetails.address} measuring{" "}
                  {propertyDetails.area} {propertyDetails.unitOfMeasurement},
                  hereinafter referred to as the &quot;PROPERTY&quot;.
                </p>

                <p>
                  The SELLER has agreed to sell and the BUYER has agreed to buy
                  the PROPERTY for a total consideration of{" "}
                  {propertyDetails.price}, and on the terms and conditions
                  hereinafter mentioned.
                </p>

                <p className="font-medium">
                  NOW THIS DEED WITNESSES AS FOLLOWS:
                </p>

                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    The SELLER hereby sells, transfers, and conveys unto the
                    BUYER the PROPERTY together with all rights, interests,
                    privileges, and appurtenances thereto.
                  </li>

                  <li>
                    The BUYER shall pay to the SELLER the total sum of{" "}
                    {propertyDetails.price} as consideration for the PROPERTY,
                    of which {propertyDetails.agreementInfo.tokenAmount} has
                    been paid as token amount, and the remaining amount shall be
                    paid at the time of registration.
                  </li>

                  <li>
                    The SELLER warrants that the PROPERTY is free from all
                    encumbrances, charges, liens, attachments, or any other
                    claims by third parties.
                  </li>

                  <li>
                    The SELLER has delivered to the BUYER all original documents
                    of title relating to the PROPERTY, which have been verified
                    and found in order.
                  </li>

                  <li>
                    The parties agree to appear before the Sub-Registrar for the
                    registration of this deed on the date and time mutually
                    agreed upon.
                  </li>

                  <li>
                    The SELLER shall pay the applicable stamp duty amount of{" "}
                    {formattedStampDuty}
                    and registration fees of {formattedRegistrationFee} as per
                    the Government of Maharashtra regulations.
                  </li>
                </ol>

                <p className="font-medium">
                  IN WITNESS WHEREOF, the parties hereto have set their hands on
                  the day, month, and year first above written.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="font-medium">SELLER</p>
                    <p className="mt-6">Current Owner</p>
                  </div>

                  <div className="text-center">
                    <p className="font-medium">BUYER</p>
                    <p className="mt-6">{buyer?.name}</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="font-medium">WITNESSES</p>
                  <ol className="mt-2 list-decimal pl-5">
                    <li>Witness 1: _________________</li>
                    <li>Witness 2: _________________</li>
                  </ol>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Registration Details</CardTitle>
            </CardHeader>
            <CardContent>
              {demoAgreementStatus === "COMPLETED" ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Date & Time
                      </p>
                      <p className="font-medium">
                        {propertyDetails.agreementInfo.registrationDate
                          ? new Date(
                              propertyDetails.agreementInfo.registrationDate,
                            ).toLocaleString()
                          : "To be scheduled"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Venue</p>
                      <p className="font-medium">
                        {propertyDetails.agreementInfo.registrationVenue ||
                          "To be confirmed"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-2 text-center">
                  <p className="text-muted-foreground text-sm">
                    Registration details will be available after payment
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">eStamp Duty & Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Stamp Duty (5%)
                    </p>
                    <p className="font-medium">{formattedStampDuty}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Registration Fee
                    </p>
                    <p className="font-medium">{formattedRegistrationFee}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Total Amount
                    </p>
                    <p className="font-medium">{formattedTotalFees}</p>
                  </div>
                  {demoPaymentStatus === "PENDING" &&
                  demoAgreementStatus === "BUYER_APPROVED" ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        simulatePayment();
                      }}
                      className="gap-1"
                    >
                      <CreditCard className="h-4 w-4" />
                      Pay eStamp Duty
                    </Button>
                  ) : demoPaymentStatus === "COMPLETED" ? (
                    <Badge variant="default">Paid</Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-yellow-200 bg-yellow-50 text-yellow-500"
                    >
                      Awaiting Buyer Approval
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          {!hasApprovedDeed &&
            demoAgreementStatus !== "COMPLETED" &&
            demoAgreementStatus === "BUYER_APPROVED" && (
              <Button onClick={approveDeed} className="gap-1">
                <Check className="h-4 w-4" />
                Approve Deed
              </Button>
            )}

          {hasApprovedDeed && demoAgreementStatus !== "COMPLETED" && (
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">
                You have approved this deed
              </span>
            </div>
          )}

          {demoAgreementStatus === "COMPLETED" && (
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">
                This agreement is complete
              </span>
            </div>
          )}

          <Button variant="outline" className="gap-1">
            <FileCheck className="h-4 w-4" />
            Verify Deed
          </Button>
        </div>

        {showDemoControls && (
          <div className="mt-6 border-t pt-4">
            <p className="text-muted-foreground mb-2 text-xs">
              Demo Controls (Only for Testing)
            </p>
            <div className="flex flex-wrap gap-2">
              {demoAgreementStatus === "GENERATED" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={simulateBuyerApproval}
                  className="gap-1"
                >
                  <UserCheck className="h-4 w-4" />
                  Simulate Buyer Approval
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );

    return (
      <>
        {content}
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground mt-4 text-xs"
          onClick={() => setShowDemoControls(!showDemoControls)}
        >
          {showDemoControls ? "Hide Demo Controls" : "Show Demo Controls"}
        </Button>
      </>
    );
  };

  const renderBuyerCard = (buyer: any) => {
    return (
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
            <p className="text-muted-foreground text-sm">{buyer.lastActive}</p>
          </div>
        </div>
        {selectedBuyer === buyer.id && (
          <Badge className="ml-auto" variant="outline">
            Selected
          </Badge>
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
                  <MapTemp
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
                <div
                  className={`border-r ${
                    activeBuyer !== null ? "hidden md:block" : "w-full"
                  } md:w-48`}
                >
                  <div className="bg-muted/40 border-b p-3">
                    <p className="font-semibold">Interested Buyers</p>
                  </div>
                  <ScrollArea className="">
                    {propertyDetails.interestedBuyers.map(renderBuyerCard)}
                  </ScrollArea>
                </div>

                {activeBuyer !== null ? (
                  <div className="flex flex-1 flex-col overflow-hidden">
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

                        {selectedBuyer === activeBuyer ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1 px-3 text-sm"
                            disabled
                          >
                            <UserCheck className="h-4 w-4" />
                            Selected
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="h-8 gap-1 px-3 text-sm"
                            onClick={() => handleSelectBuyer(activeBuyer)}
                          >
                            <Check className="h-4 w-4" />
                            Select Buyer
                          </Button>
                        )}
                      </div>
                    </div>

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
              className="scrollbar flex-1 overflow-auto pt-4 data-[state=active]:flex data-[state=active]:flex-col"
            >
              <Card className="flex flex-1 flex-col p-4">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Sales Agreement</CardTitle>
                    {selectedBuyer && (
                      <Badge variant="outline" className="h-6 px-2 text-sm">
                        {propertyDetails.agreementStatus === "PENDING"
                          ? "Draft"
                          : propertyDetails.agreementStatus.replace("_", " ")}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    Generate and manage the property sale agreement
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  {renderAgreementContent()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
