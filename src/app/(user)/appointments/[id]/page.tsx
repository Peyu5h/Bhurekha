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
import { Button } from "~/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  CreditCard,
  Check,
  FileSignature,
  IndianRupee,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Progress } from "~/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock appointment data - in a real app, this would be fetched from an API
const APPOINTMENTS = {
  "APT-2024-001": {
    id: "APT-2024-001",
    title: "Property Registration",
    propertyId: "PRJ-2024-001",
    propertyTitle: "Luxury Apartment in Shastri Nagar",
    propertyAddress: "123, Shastri Nagar, Mumbai, Maharashtra 400001",
    propertyPrice: "₹1,25,00,000",
    date: "2024-06-12",
    time: "11:00 AM",
    location: "Sub-Registrar Office, Mumbai Central",
    with: "Sub-Registrar Dept.",
    status: "confirmed",
    daysLeft: 3,
    seller: {
      name: "Rajesh Sharma",
      contactNumber: "+91 9876543210",
      isVerified: true,
      hasConsented: true,
    },
    buyer: {
      name: "Vikram Malhotra",
      contactNumber: "+91 8765432109",
      isVerified: true,
      hasConsented: true,
    },
    documents: {
      salesDeed: {
        id: "DEED-2024-05-12345",
        generatedDate: "2024-05-16T10:30:00Z",
        status: "approved",
        url: "#",
      },
      stampDuty: {
        amount: "₹6,25,000",
        paymentDate: "2024-05-18T14:20:00Z",
        receiptNo: "SD-8724651",
        status: "paid",
      },
      registrationFee: {
        amount: "₹30,000",
        paymentDate: "2024-05-18T14:20:00Z",
        receiptNo: "RF-8724651",
        status: "paid",
      },
    },
  },
  "APT-2024-002": {
    id: "APT-2024-002",
    title: "Property Registration",
    propertyId: "PRJ-2024-002",
    propertyTitle: "Villa in Koregaon Park",
    propertyAddress: "45, Koregaon Park, Pune, Maharashtra 411001",
    propertyPrice: "₹2,50,00,000",
    date: "2024-05-05",
    time: "10:30 AM",
    location: "Sub-Registrar Office, Pune Camp",
    with: "Sub-Registrar Dept.",
    status: "completed",
    daysLeft: 0,
    seller: {
      name: "Anil Patel",
      contactNumber: "+91 9876543210",
      isVerified: true,
      hasConsented: true,
    },
    buyer: {
      name: "Neha Singh",
      contactNumber: "+91 8765432109",
      isVerified: true,
      hasConsented: true,
    },
    documents: {
      salesDeed: {
        id: "DEED-2024-05-54321",
        generatedDate: "2024-04-20T10:30:00Z",
        status: "approved",
        url: "#",
      },
      stampDuty: {
        amount: "₹12,50,000",
        paymentDate: "2024-04-22T14:20:00Z",
        receiptNo: "SD-8724652",
        status: "paid",
      },
      registrationFee: {
        amount: "₹45,000",
        paymentDate: "2024-04-22T14:20:00Z",
        receiptNo: "RF-8724652",
        status: "paid",
      },
    },
  },
  "APT-2024-003": {
    id: "APT-2024-003",
    title: "Property Registration",
    propertyId: "PRJ-2024-003",
    propertyTitle: "Agricultural Land in Nagpur",
    propertyAddress: "Survey No. 123, Kalmeshwar, Nagpur, Maharashtra 440001",
    propertyPrice: "₹75,00,000",
    date: "2024-06-20",
    time: "02:00 PM",
    location: "Sub-Registrar Office, Nagpur West",
    with: "Sub-Registrar Dept.",
    status: "scheduled",
    daysLeft: 11,
    seller: {
      name: "Prakash Deshmukh",
      contactNumber: "+91 9876543210",
      isVerified: true,
      hasConsented: false,
    },
    buyer: {
      name: "Ravi Kumar",
      contactNumber: "+91 8765432109",
      isVerified: true,
      hasConsented: false,
    },
    documents: {
      salesDeed: {
        id: "DEED-2024-06-67890",
        generatedDate: "2024-06-05T10:30:00Z",
        status: "pending",
        url: "#",
      },
      stampDuty: {
        amount: "₹3,75,000",
        paymentDate: "2024-06-07T14:20:00Z",
        receiptNo: "SD-8724653",
        status: "paid",
      },
      registrationFee: {
        amount: "₹20,000",
        paymentDate: "2024-06-07T14:20:00Z",
        receiptNo: "RF-8724653",
        status: "paid",
      },
    },
  },
};

export default function AppointmentDetails({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { user } = useWalletAuth();
  const [viewDeed, setViewDeed] = React.useState(false);

  // Get the ID directly from params without using React.use() since it seems to be creating type issues
  const appointmentId = params.id;

  const appointment = APPOINTMENTS[appointmentId as keyof typeof APPOINTMENTS];

  const calculateTimeLeft = () => {
    if (!appointment) return "";

    const appointmentDate = new Date(
      `${appointment.date}T${appointment.time.replace(" AM", ":00").replace(" PM", ":00")}`,
    );
    const now = new Date();

    // Convert to hours
    const diff = appointmentDate.getTime() - now.getTime();

    // Return empty string if date is in the past
    if (diff < 0) return "";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h left`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    } else {
      return `${minutes}m left`;
    }
  };

  const timeLeft = calculateTimeLeft();
  const isAuthorityPresent = appointment?.status === "completed";
  const consentCompleted =
    appointment?.seller.hasConsented && appointment?.buyer.hasConsented;
  const progress = appointment
    ? (appointment.documents.salesDeed.status === "approved" ? 25 : 0) +
      (appointment.documents.stampDuty.status === "paid" ? 25 : 0) +
      (consentCompleted ? 25 : 0) +
      (appointment.status === "completed" ? 25 : 0)
    : 0;

  if (!appointment) {
    return (
      <div className="container flex flex-col p-12">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border p-12">
          <AlertCircle className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="mb-2 text-xl font-medium">Appointment Not Found</h3>
          <p className="text-muted-foreground mb-6 text-center">
            The appointment you are looking for does not exist or you don&apos;t
            have access to it.
          </p>
          <Button asChild>
            <Link href="/appointments">View All Appointments</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col overflow-auto p-4">
      <div className="grid flex-1 gap-4 overflow-hidden md:grid-cols-3">
        <div className="flex flex-col overflow-hidden md:col-span-2">
          <Card className="flex flex-1 flex-col overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{appointment.title}</CardTitle>
                  <CardDescription>
                    Appointment ID: {appointment.id}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    appointment.status === "confirmed"
                      ? "default"
                      : appointment.status === "completed"
                        ? "outline"
                        : "secondary"
                  }
                  className={
                    appointment.status === "completed"
                      ? "border-green-200 bg-green-50 text-green-600"
                      : ""
                  }
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1">
              <CardContent className="space-y-4 pr-4 pb-6">
                <div>
                  <h3 className="mb-3 font-medium">Property Information</h3>
                  <Card>
                    <CardContent className="">
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="font-medium">
                            {appointment.propertyTitle}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {appointment.propertyAddress}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Sale Price
                            </p>
                            <p className="font-medium">
                              {appointment.propertyPrice}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Property ID
                            </p>
                            <p className="font-medium">
                              {appointment.propertyId}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-3 font-medium">Participants</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Seller
                            </p>
                            <p className="font-medium">
                              {appointment.seller.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {appointment.seller.contactNumber}
                            </p>
                          </div>
                          <Badge
                            variant={
                              appointment.seller.isVerified
                                ? "outline"
                                : "outline"
                            }
                            className={
                              appointment.seller.isVerified
                                ? "border-green-200 bg-green-50 text-green-600"
                                : "border-amber-200 bg-amber-50 text-amber-600"
                            }
                          >
                            {appointment.seller.isVerified
                              ? "Verified"
                              : "Pending"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Buyer
                            </p>
                            <p className="font-medium">
                              {appointment.buyer.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {appointment.buyer.contactNumber}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              appointment.buyer.isVerified
                                ? "border-green-200 bg-green-50 text-green-600"
                                : "border-amber-200 bg-amber-50 text-amber-600"
                            }
                          >
                            {appointment.buyer.isVerified
                              ? "Verified"
                              : "Pending"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSignature className="text-muted-foreground h-4 w-4" />
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Sales Deed
                        </p>
                        <p className="font-medium">
                          {appointment.documents.salesDeed.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          appointment.documents.salesDeed.status === "approved"
                            ? "border-green-200 bg-green-50 text-green-600"
                            : "border-amber-200 bg-amber-50 text-amber-600"
                        }
                      >
                        {appointment.documents.salesDeed.status === "approved"
                          ? "Approved"
                          : "Pending"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewDeed(true)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="text-muted-foreground h-4 w-4" />
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Stamp Duty
                        </p>
                        <p className="font-medium">
                          {appointment.documents.stampDuty.amount}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Receipt: {appointment.documents.stampDuty.receiptNo}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-200 bg-green-50 text-green-600"
                    >
                      Paid
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="text-muted-foreground h-4 w-4" />
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Registration Fee
                        </p>
                        <p className="font-medium">
                          {appointment.documents.registrationFee.amount}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Receipt:{" "}
                          {appointment.documents.registrationFee.receiptNo}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-200 bg-green-50 text-green-600"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>

        <div className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Process Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Overall Progress</p>
                  <p className="text-xs font-medium">{progress}%</p>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {appointment.documents.salesDeed.status === "approved" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-amber-500" />
                  )}
                  <p className="text-sm">Sales Deed Verification</p>
                </div>
                <div className="flex items-center gap-2">
                  {appointment.documents.stampDuty.status === "paid" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-amber-500" />
                  )}
                  <p className="text-sm">Payments Completed</p>
                </div>
                <div className="flex items-center gap-2">
                  {consentCompleted ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-amber-500" />
                  )}
                  <p className="text-sm">Consent Verification</p>
                </div>
                <div className="flex items-center gap-2">
                  {appointment.status === "completed" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="border-muted h-4 w-4 rounded-full border" />
                  )}
                  <p className="text-sm">Property Transfer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="">Appointment Details</CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Date</p>
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Time</p>
                      <p className="font-medium">{appointment.time}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Location</p>
                      <p className="font-medium">{appointment.location}</p>
                    </div>
                  </div>
                  {appointment.status !== "completed" && timeLeft && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <div>
                        <p className="text-xs text-amber-500">Time Remaining</p>
                        <p className="font-medium text-amber-600">{timeLeft}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="p-0 text-lg">Registration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="boder p-4">
                <p className="mb-2 text-sm font-medium">Authority Status</p>
                <Badge
                  variant="outline"
                  className={
                    isAuthorityPresent
                      ? "border-green-200 bg-green-50 text-green-600"
                      : "border-amber-200 bg-amber-50 text-amber-600"
                  }
                >
                  {isAuthorityPresent
                    ? "Completed"
                    : appointment.status === "confirmed"
                      ? "Scheduled"
                      : "Pending"}
                </Badge>
                <p className="text-muted-foreground mt-2 text-xs">
                  {isAuthorityPresent
                    ? "The property transfer has been completed successfully."
                    : "The sub-registrar will verify your documents during the appointment."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={viewDeed} onOpenChange={setViewDeed}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Sales Deed Document</DialogTitle>
            <DialogDescription>
              Deed ID: {appointment.documents.salesDeed.id}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/30 h-[70vh] rounded-md border p-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <h3 className="text-center text-lg font-bold">SALE DEED</h3>

                <p>
                  THIS DEED OF SALE is made and executed on this{" "}
                  {new Date(appointment.date).toLocaleDateString()} between:
                </p>

                <p className="font-medium">
                  {appointment.seller.name}, residing at [Seller Address],
                  hereinafter called the &quot;SELLER&quot; of the ONE PART,
                </p>

                <p>AND</p>

                <p className="font-medium">
                  {appointment.buyer.name}, residing at [Buyer Address],
                  hereinafter called the &quot;BUYER&quot; of the OTHER PART.
                </p>

                <p className="font-medium">WHEREAS:</p>

                <p>
                  The SELLER is the absolute and rightful owner of property
                  located at {appointment.propertyAddress} hereinafter referred
                  to as the &quot;PROPERTY&quot;.
                </p>

                <p>
                  The SELLER has agreed to sell and the BUYER has agreed to buy
                  the PROPERTY for a total consideration of{" "}
                  {appointment.propertyPrice}, and on the terms and conditions
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
                    {appointment.propertyPrice} as consideration for the
                    PROPERTY.
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
                    The BUYER has paid the applicable stamp duty amount of{" "}
                    {appointment.documents.stampDuty.amount} and registration
                    fees of {appointment.documents.registrationFee.amount} as
                    per the Government of Maharashtra regulations.
                  </li>
                </ol>

                <p className="font-medium">
                  IN WITNESS WHEREOF, the parties hereto have set their hands on
                  the day, month, and year first above written.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="font-medium">SELLER</p>
                    <p className="mt-6">{appointment.seller.name}</p>
                  </div>

                  <div className="text-center">
                    <p className="font-medium">BUYER</p>
                    <p className="mt-6">{appointment.buyer.name}</p>
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
          </div>
          <div className="flex justify-between">
            <Button variant="outline">Download PDF</Button>
            <Button onClick={() => setViewDeed(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
