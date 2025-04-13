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
  Calendar,
  CheckCircle2,
  RefreshCw,
  History,
  User,
  X,
  ExternalLink,
  BookOpen,
  Lock,
  FileCheck,
  Clock,
  FileSignature,
  Handshake,
  CreditCard,
  UserCheck,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import ChatBot from "~/components/chatbot/chatBot";
import { MapTemp } from "~/lib/map";
import { Separator } from "~/components/ui/separator";
import { Timeline, TimelineItem } from "~/components/ui/timeline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";

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
      url: "https://images.unsplash.com/photo-1720481811085-711f224178ee?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Front View",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1617228133035-2347f159e755?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Living Room",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1669103148197-539672dbdeff?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      preview:
        "https://images.unsplash.com/photo-1568057373484-69bbc440c02e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdW1lbnRzJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      name: "Sale Agreement",
      date: "2024-03-08",
      status: "VERIFIED",
      size: "1.8 MB",
      type: "pdf",
      url: "https://example.com/documents/sale_agreement.pdf",
      preview:
        "https://images.unsplash.com/photo-1568057373189-8bf0cf6179e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      name: "Floor Plan",
      date: "2024-03-03",
      status: "VERIFIED",
      size: "3.1 MB",
      type: "image",
      url: "https://example.com/documents/floor_plan.jpg",
      preview:
        "https://images.unsplash.com/photo-1721244653580-79577d2822a2?q=80&w=1796&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  sellerInfo: {
    name: "Rajesh Sharma",
    contactNumber: "+91-9876543210",
    email: "rajesh.s@example.com",
    verificationStatus: "VERIFIED",
    previousListings: 3,
    memberSince: "2022-01-15",
    ratings: 4.8,
    reviewCount: 12,
  },
  propertyHistory: {
    previousOwners: 2,
    lastSoldDate: "2021-05-10",
    lastSoldPrice: "₹95,00,000",
    constructionYear: 2015,
    renovationYear: 2019,
    propertyTaxHistory: "Regular payments, no outstanding dues",
    disputeHistory: "No legal disputes on record",
    timeline: [
      {
        date: "2015-06",
        event: "Property constructed",
        details: "Original construction completed",
      },
      {
        date: "2019-03",
        event: "Major renovation",
        details: "Kitchen and bathrooms renovated",
      },
      {
        date: "2021-05",
        event: "Ownership transferred",
        details: "Purchased by current owner",
      },
      {
        date: "2024-03",
        event: "Listed for sale",
        details: "Current listing",
      },
    ],
  },
  legalDetails: {
    naOrder: "NA permission approved on 12-Mar-2014",
    occupancyCertificate:
      "Issued by Mumbai Municipal Corporation on 10-Jun-2015",
    reraRegistration: "MAHARERA123456789",
    encumbranceCertificate: "Clear for period 2010-2024",
    titleDeed: "Registered at Mumbai Sub-Registrar Office",
    propertyTaxStatus: "Paid up to date",
  },
  amenities: [
    "24/7 Security",
    "Swimming Pool",
    "Gym",
    "Children's Play Area",
    "Visitor Parking",
    "Power Backup",
    "Rainwater Harvesting",
  ],
  sellerAccepted: false,
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

export default function PropertyDetailsForBuyer({
  params,
}: {
  params: { id: string };
}) {
  const { user } = useWalletAuth();
  const router = useRouter();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [messageText, setMessageText] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isGeneratingDeed, setIsGeneratingDeed] = useState(false);
  const [hasApprovedDeed, setHasApprovedDeed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [demoSellerAccepted, setDemoSellerAccepted] = useState(
    propertyDetails.sellerAccepted,
  );
  const [demoAgreementStatus, setDemoAgreementStatus] = useState(
    propertyDetails.agreementStatus,
  );
  const [demoPaymentStatus, setDemoPaymentStatus] = useState(
    propertyDetails.agreementInfo.paymentStatus,
  );
  const [showDemoControls, setShowDemoControls] = useState(false);

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

  const generateSalesDeed = () => {
    setIsGeneratingDeed(true);
    setTimeout(() => {
      setIsGeneratingDeed(false);
      setDemoAgreementStatus("GENERATED");
      toast.success("Sales Deed Generated");
    }, 2000);
  };

  const approveDeed = () => {
    setHasApprovedDeed(true);
    setDemoAgreementStatus("BUYER_APPROVED");
    toast("Deed Approved");
  };

  const makePayment = () => {
    setShowPaymentModal(true);
  };

  const completeDemoPayment = () => {
    setShowPaymentModal(false);
    setDemoPaymentStatus("COMPLETED");
    setDemoAgreementStatus("COMPLETED");
    propertyDetails.agreementInfo.registrationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();
    propertyDetails.agreementInfo.registrationVenue =
      "Sub-Registrar Office, Mumbai Central";
    toast.success("Payment Successful");
  };

  const renderAgreementContent = () => {
    if (demoAgreementStatus === "PENDING" && !demoSellerAccepted) {
      return (
        <div className="space-y-4 text-center">
          <div className="text-muted-foreground bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full p-4">
            <Clock className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold">Waiting for seller response</h3>
          <p className="text-muted-foreground">
            The seller hasn&apos;t accepted your interest yet. You&apos;ll be
            notified when they do.
          </p>

          <Button variant="outline" className="mt-4">
            Contact Seller
          </Button>

          {showDemoControls && (
            <div className="mt-6 border-t pt-4">
              <p className="text-muted-foreground mb-2 text-xs">
                Demo Controls (Only for Testing)
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setDemoSellerAccepted(true);
                  toast.success("Seller Accepted");
                }}
                className="gap-1"
              >
                <UserCheck className="h-4 w-4" />
                Simulate Seller Acceptance
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground mt-4 text-xs"
            onClick={() => setShowDemoControls(!showDemoControls)}
          >
            {showDemoControls ? "Hide Demo Controls" : "Show Demo Controls"}
          </Button>
        </div>
      );
    }

    if (demoAgreementStatus === "PENDING" && demoSellerAccepted) {
      return (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 p-4 text-green-500">
            <Handshake className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold">
            Seller has accepted your interest!
          </h3>
          <p className="text-muted-foreground mb-6">
            You can now generate the sales deed to proceed with the purchase.
          </p>
          <Button
            onClick={generateSalesDeed}
            disabled={isGeneratingDeed}
            className="gap-2"
          >
            {isGeneratingDeed ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Generating Sales Deed...
              </>
            ) : (
              <>
                <FileSignature className="h-4 w-4" />
                Generate Sales Deed
              </>
            )}
          </Button>
        </div>
      );
    }

    const propertyValue = parseInt(propertyDetails.price.replace(/[₹,]/g, ""));
    const stampDutyPercentage = 5;
    const registrationFee = Math.min(propertyValue * 0.01, 30000);

    const stampDutyAmount = propertyValue * (stampDutyPercentage / 100);
    const formattedStampDuty = `₹${stampDutyAmount.toLocaleString()}`;
    const formattedRegistrationFee = `₹${registrationFee.toLocaleString()}`;
    const totalFees = stampDutyAmount + registrationFee;
    const formattedTotalFees = `₹${totalFees.toLocaleString()}`;

    return (
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
              {demoAgreementStatus === "BUYER_APPROVED" && "You Approved"}
              {demoAgreementStatus === "SELLER_APPROVED" && "Seller Approved"}
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
              <CardTitle className="text-sm">Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Avatar className="mr-3 h-10 w-10">
                  <AvatarFallback>
                    {propertyDetails.sellerInfo.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {propertyDetails.sellerInfo.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {propertyDetails.sellerInfo.contactNumber}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {propertyDetails.sellerInfo.email}
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
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">You (Buyer)</p>
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
                  {propertyDetails.sellerInfo.name}, residing at [Seller
                  Address], hereinafter called the &quot;SELLER&quot; of the ONE
                  PART,
                </p>

                <p>AND</p>

                <p className="font-medium">
                  [Buyer Name], residing at [Buyer Address], hereinafter called
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
                    {formattedStampDuty} and registration fees of{" "}
                    {formattedRegistrationFee} as per the Government of
                    Maharashtra regulations.
                  </li>
                </ol>

                <p className="font-medium">
                  IN WITNESS WHEREOF, the parties hereto have set their hands on
                  the day, month, and year first above written.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="font-medium">SELLER</p>
                    <p className="mt-6">{propertyDetails.sellerInfo.name}</p>
                  </div>

                  <div className="text-center">
                    <p className="font-medium">BUYER</p>
                    <p className="mt-6">[Buyer Name]</p>
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
                    Registration details will be available after seller pays the
                    eStamp duty
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
                  {demoPaymentStatus === "PENDING" ? (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs">
                        Waiting for Seller Payment
                      </span>
                    </div>
                  ) : (
                    <Badge variant="default">Paid by Seller</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          {!hasApprovedDeed && demoAgreementStatus === "GENERATED" && (
            <Button onClick={approveDeed} className="gap-1">
              <CheckCircle2 className="h-4 w-4" />
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
              <CheckCircle2 className="h-4 w-4 text-green-500" />
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

        {showDemoControls &&
          (demoAgreementStatus === "BUYER_APPROVED" ||
            demoAgreementStatus === "SELLER_APPROVED") && (
            <div className="mt-6 border-t pt-4">
              <p className="text-muted-foreground mb-2 text-xs">
                Demo Controls (Only for Testing)
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (demoAgreementStatus === "BUYER_APPROVED") {
                    setDemoAgreementStatus("SELLER_APPROVED");
                    toast.success("Seller Approved");
                  } else if (demoAgreementStatus === "SELLER_APPROVED") {
                    setDemoPaymentStatus("COMPLETED");
                    setDemoAgreementStatus("COMPLETED");
                    propertyDetails.agreementInfo.registrationDate = new Date(
                      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
                    ).toISOString();
                    propertyDetails.agreementInfo.registrationVenue =
                      "Sub-Registrar Office, Mumbai Central";
                    toast.success("Seller Paid eStamp Duty");
                  }
                }}
                className="gap-1"
              >
                {demoAgreementStatus === "BUYER_APPROVED" ? (
                  <>
                    <UserCheck className="h-4 w-4" />
                    Simulate Seller Approval
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Simulate Seller eStamp Payment
                  </>
                )}
              </Button>
            </div>
          )}
      </div>
    );
  };

  const renderPaymentModal = () => {
    return (
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Make a token payment to confirm the property purchase
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <Input
                id="amount"
                value={propertyDetails.agreementInfo.tokenAmount}
                disabled
                className="col-span-3"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="cardNumber" className="text-sm font-medium">
                Card Number
              </label>
              <Input
                id="cardNumber"
                placeholder="xxxx xxxx xxxx xxxx"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="expiryDate" className="text-sm font-medium">
                  Expiry Date
                </label>
                <Input id="expiryDate" placeholder="MM/YY" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="cvv" className="text-sm font-medium">
                  CVV
                </label>
                <Input id="cvv" placeholder="xxx" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={completeDemoPayment}>
              Pay {propertyDetails.agreementInfo.tokenAmount}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="flex h-auto flex-col p-4 md:max-h-screen md:overflow-hidden">
      <ChatBot propertyData={propertyDetails} />
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

            <Card className="scrollbar overflow-auto">
              <CardHeader className="pb-2">
                <CardTitle>Property Details</CardTitle>
                <CardDescription>{propertyDetails.address}</CardDescription>
                <div className="text-sm">{propertyDetails.description}</div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
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

                <Separator className="my-2" />

                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-medium">
                    Seller Information
                  </p>
                  <div className="flex items-center">
                    <Avatar className="bg-muted mr-3 h-10 w-10">
                      <AvatarFallback>
                        {propertyDetails.sellerInfo.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {propertyDetails.sellerInfo.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-muted-foreground text-xs">
                          +91 8928937191
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="scrollbar flex flex-col overflow-hidden md:col-span-2 md:h-[calc(100vh-12%)]">
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

            <TabsContent
              value="details"
              className="h-full flex-1 overflow-auto pt-4"
            >
              <Card className="scrollbar h-full overflow-auto">
                <CardHeader>
                  <CardTitle>Detailed Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold">Location</h3>
                    <MapTemp
                      latitude={propertyDetails.coordinates.latitude}
                      longitude={propertyDetails.coordinates.longitude}
                      title={propertyDetails.title}
                      address={propertyDetails.address}
                      showZoomControls
                      showDirections
                      height="300px"
                    />
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Legal Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {Object.entries(propertyDetails.legalDetails).map(
                        ([key, value]) => (
                          <div key={key} className="rounded-md border p-3">
                            <p className="text-muted-foreground text-xs capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="text-sm font-medium">{value}</p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="agreement">
                    <h3 className="mb-2 font-semibold">Seller Agreement</h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex items-center">
                        <History className="text-muted-foreground mr-2 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Previous Owners
                          </p>
                          <p className="font-medium">
                            {propertyDetails.propertyHistory.previousOwners}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Construction Year
                          </p>
                          <p className="font-medium">
                            {propertyDetails.propertyHistory.constructionYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <RefreshCw className="text-muted-foreground mr-2 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Last Sold
                          </p>
                          <p className="font-medium">
                            {propertyDetails.propertyHistory.lastSoldDate} (
                            {propertyDetails.propertyHistory.lastSoldPrice})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="text-muted-foreground mr-2 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Dispute Status
                          </p>
                          <p className="font-medium">
                            {propertyDetails.propertyHistory.disputeHistory}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="my-4 font-semibold">Timeline</h3>
                      <Timeline>
                        {propertyDetails.propertyHistory.timeline.map(
                          (item, i) => (
                            <TimelineItem key={i}>
                              <div className="space-y-1">
                                <div className="text-sm font-medium">
                                  {item.event}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  {item.date}
                                </div>
                                <div className="text-sm">{item.details}</div>
                              </div>
                            </TimelineItem>
                          ),
                        )}
                      </Timeline>
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
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {propertyDetails.documents.map((doc) => (
                      <Dialog key={doc.id}>
                        <DialogTrigger asChild>
                          <div className="hover:border-primary/50 group cursor-pointer overflow-hidden rounded-md border transition-all">
                            <div className="bg-muted aspect-[4/3] w-full overflow-hidden">
                              <img
                                src={doc.preview}
                                alt={doc.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {doc.type === "pdf" ? (
                                    <FileText className="h-4 w-4" />
                                  ) : (
                                    <BookOpen className="h-4 w-4" />
                                  )}
                                  <p className="text-sm font-medium">
                                    {doc.name}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {doc.status}
                                </Badge>
                              </div>
                              <div className="text-muted-foreground mt-1 flex items-center justify-between text-xs">
                                <span>{doc.date}</span>
                                <span>{doc.size}</span>
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{doc.name}</DialogTitle>
                            <DialogDescription>
                              {doc.date} • {doc.size} • {doc.status}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="aspect-auto max-h-[70vh] overflow-auto rounded-md border">
                            <img
                              src={doc.preview}
                              alt={doc.name}
                              className="w-full object-contain"
                            />
                          </div>
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open in new tab
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 overflow-hidden pt-4">
              <Card className="flex h-full flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Chat with Seller</CardTitle>
                  </div>
                  <CardDescription>
                    Chatting with {propertyDetails.sellerInfo.name}
                  </CardDescription>
                </CardHeader>
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 py-4">
                    {propertyDetails.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "BUYER" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender !== "BUYER" && (
                          <Avatar className="mr-2 h-8 w-8">
                            <AvatarFallback>
                              {propertyDetails.sellerInfo.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
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
                        {message.sender === "BUYER" && (
                          <Avatar className="ml-2 h-8 w-8">
                            <AvatarFallback>Y</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex w-full gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-12 resize-none"
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
                </div>
              </Card>
            </TabsContent>

            <TabsContent
              value="agreement"
              className="scrollbar flex-1 overflow-auto py-4"
            >
              <Card className="scrollbar h-full overflow-auto">
                <CardHeader>
                  <CardTitle>Sales Agreement</CardTitle>
                  <CardDescription>
                    Complete the purchase process
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100%-8rem)]">
                  {renderAgreementContent()}
                </CardContent>
              </Card>
              {renderPaymentModal()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
