"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  ChevronRight,
  Check,
  X,
  Calendar as CalendarIcon,
  Search,
  Filter,
  FileSignature,
  IndianRupee,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "~/components/ui/scroll-area";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";

const APPOINTMENTS = [
  {
    id: "APT-2024-001",
    title: "Property Registration",
    propertyId: "PRJ-2024-001",
    propertyTitle: "Luxury Apartment in Shastri Nagar",
    propertyAddress: "123, Shastri Nagar, Mumbai, Maharashtra 400001",
    propertyPrice: "₹1,25,00,000",
    date: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    time: "11:00 AM",
    location: "Sub-Registrar Office, Mumbai Central",
    status: "confirmed",
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
  {
    id: "APT-2024-002",
    title: "Property Registration",
    propertyId: "PRJ-2024-002",
    propertyTitle: "Villa in Koregaon Park",
    propertyAddress: "45, Koregaon Park, Pune, Maharashtra 411001",
    propertyPrice: "₹2,50,00,000",
    date: "2024-05-05",
    time: "10:30 AM",
    location: "Sub-Registrar Office, Pune Camp",
    status: "completed",
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
  {
    id: "APT-2024-003",
    title: "Property Registration",
    propertyId: "PRJ-2024-003",
    propertyTitle: "Agricultural Land in Nagpur",
    propertyAddress: "Survey No. 123, Kalmeshwar, Nagpur, Maharashtra 440001",
    propertyPrice: "₹75,00,000",
    date: "2024-06-20",
    time: "02:00 PM",
    location: "Sub-Registrar Office, Nagpur West",
    status: "scheduled",
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
  {
    id: "APT-2024-004",
    title: "Property Registration",
    propertyId: "PRJ-2024-004",
    propertyTitle: "Commercial Shop in Dadar",
    propertyAddress: "Shop No. 5, Market Complex, Dadar West, Mumbai 400028",
    propertyPrice: "₹95,00,000",
    date: new Date(new Date().setDate(new Date().getDate() + 3))
      .toISOString()
      .split("T")[0],
    time: "03:30 PM",
    location: "Sub-Registrar Office, Mumbai Central",
    status: "confirmed",
    seller: {
      name: "Mukesh Shah",
      contactNumber: "+91 9876543210",
      isVerified: true,
      hasConsented: true,
    },
    buyer: {
      name: "Amit Jain",
      contactNumber: "+91 8765432109",
      isVerified: true,
      hasConsented: true,
    },
    documents: {
      salesDeed: {
        id: "DEED-2024-06-22345",
        generatedDate: "2024-06-02T10:30:00Z",
        status: "approved",
        url: "#",
      },
      stampDuty: {
        amount: "₹4,75,000",
        paymentDate: "2024-06-03T14:20:00Z",
        receiptNo: "SD-8724654",
        status: "paid",
      },
      registrationFee: {
        amount: "₹25,000",
        paymentDate: "2024-06-03T14:20:00Z",
        receiptNo: "RF-8724654",
        status: "paid",
      },
    },
  },
  {
    id: "APT-2024-005",
    title: "Property Registration",
    propertyId: "PRJ-2024-005",
    propertyTitle: "Residential Flat in Powai",
    propertyAddress: "A-302, Lake Homes, Powai, Mumbai 400076",
    propertyPrice: "₹1,85,00,000",
    date: "2024-07-10",
    time: "11:30 AM",
    location: "Sub-Registrar Office, Powai",
    status: "scheduled",
    seller: {
      name: "Sunita Kapoor",
      contactNumber: "+91 9876543210",
      isVerified: true,
      hasConsented: false,
    },
    buyer: {
      name: "Rohit Sharma",
      contactNumber: "+91 8765432109",
      isVerified: true,
      hasConsented: false,
    },
    documents: {
      salesDeed: {
        id: "DEED-2024-06-98765",
        generatedDate: "2024-06-25T10:30:00Z",
        status: "pending",
        url: "#",
      },
      stampDuty: {
        amount: "₹9,25,000",
        paymentDate: "",
        receiptNo: "",
        status: "pending",
      },
      registrationFee: {
        amount: "₹35,000",
        paymentDate: "",
        receiptNo: "",
        status: "pending",
      },
    },
  },
  {
    id: "APT-2024-006",
    title: "Property Registration",
    propertyId: "PRJ-2024-006",
    propertyTitle: "Commercial Office in BKC",
    propertyAddress: "Office 506, Trade Center, BKC, Mumbai 400051",
    propertyPrice: "₹3,50,00,000",
    date: "2024-07-18",
    time: "10:00 AM",
    location: "Sub-Registrar Office, Mumbai Central",
    status: "scheduled",
    seller: {
      name: "Anand Mehta",
      contactNumber: "+91 9876543210",
      isVerified: true,
      hasConsented: false,
    },
    buyer: {
      name: "Deepak Gupta",
      contactNumber: "+91 8765432109",
      isVerified: true,
      hasConsented: false,
    },
    documents: {
      salesDeed: {
        id: "DEED-2024-07-12345",
        generatedDate: "2024-06-30T10:30:00Z",
        status: "pending",
        url: "#",
      },
      stampDuty: {
        amount: "₹17,50,000",
        paymentDate: "",
        receiptNo: "",
        status: "pending",
      },
      registrationFee: {
        amount: "₹50,000",
        paymentDate: "",
        receiptNo: "",
        status: "pending",
      },
    },
  },
  {
    id: "APT-2024-007",
    title: "Property Registration",
    propertyId: "PRJ-2024-007",
    propertyTitle: "Farm House in Karjat",
    propertyAddress: "Plot No. 45, Hill Road, Karjat, Maharashtra 410201",
    propertyPrice: "₹1,10,00,000",
    date: "2024-05-15",
    time: "01:00 PM",
    location: "Sub-Registrar Office, Karjat",
    status: "completed",
    seller: {
      name: "Ramesh Patil",
      contactNumber: "+91 9876543210",
      isVerified: true,
      hasConsented: true,
    },
    buyer: {
      name: "Aditya Shah",
      contactNumber: "+91 8765432109",
      isVerified: true,
      hasConsented: true,
    },
    documents: {
      salesDeed: {
        id: "DEED-2024-05-78901",
        generatedDate: "2024-05-01T10:30:00Z",
        status: "approved",
        url: "#",
      },
      stampDuty: {
        amount: "₹5,50,000",
        paymentDate: "2024-05-03T14:20:00Z",
        receiptNo: "SD-8724655",
        status: "paid",
      },
      registrationFee: {
        amount: "₹30,000",
        paymentDate: "2024-05-03T14:20:00Z",
        receiptNo: "RF-8724655",
        status: "paid",
      },
    },
  },
  {
    id: "APT-2024-008",
    title: "Property Registration",
    propertyId: "PRJ-2024-008",
    propertyTitle: "Penthouse in Juhu",
    propertyAddress: "Penthouse, Sea Breeze Tower, Juhu, Mumbai 400049",
    propertyPrice: "₹5,50,00,000",
    date: "2024-05-28",
    time: "02:30 PM",
    location: "Sub-Registrar Office, Andheri",
    status: "completed",
    seller: {
      name: "Sanjay Kapoor",
      contactNumber: "+91 9876543210",
      isVerified: true,
      hasConsented: true,
    },
    buyer: {
      name: "Priya Malhotra",
      contactNumber: "+91 8765432109",
      isVerified: true,
      hasConsented: true,
    },
    documents: {
      salesDeed: {
        id: "DEED-2024-05-65432",
        generatedDate: "2024-05-10T10:30:00Z",
        status: "approved",
        url: "#",
      },
      stampDuty: {
        amount: "₹27,50,000",
        paymentDate: "2024-05-12T14:20:00Z",
        receiptNo: "SD-8724656",
        status: "paid",
      },
      registrationFee: {
        amount: "₹60,000",
        paymentDate: "2024-05-12T14:20:00Z",
        receiptNo: "RF-8724656",
        status: "paid",
      },
    },
  },
];

const calculateTimeLeft = (date: string, time: string) => {
  const appointmentDate = new Date(
    `${date}T${time.replace(" AM", ":00").replace(" PM", ":00")}`,
  );
  const now = new Date();

  const diff = appointmentDate.getTime() - now.getTime();

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

interface AppointmentCardProps {
  appointment: (typeof APPOINTMENTS)[0];
  onSelect: (id: string) => void;
}

const AppointmentCard = ({ appointment, onSelect }: AppointmentCardProps) => {
  const isPast = new Date(appointment.date) < new Date();
  const isToday =
    new Date(appointment.date).toDateString() === new Date().toDateString();
  const timeLeft = calculateTimeLeft(appointment.date, appointment.time);

  return (
    <Card className="hover:border-primary/30 cursor-pointer transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{appointment.title}</CardTitle>
            <CardDescription>ID: {appointment.id}</CardDescription>
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
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <p className="font-medium">{appointment.propertyTitle}</p>
            <p className="text-muted-foreground text-sm">
              {appointment.propertyAddress}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-xs">Date</p>
                <p className="font-medium">
                  {new Date(appointment.date).toLocaleDateString()}
                  {isToday && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Today
                    </Badge>
                  )}
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
            {timeLeft && !isPast && (
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <div>
                  <p className="text-xs text-amber-500">Time Left</p>
                  <p className="font-medium text-amber-600">{timeLeft}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          onClick={() => onSelect(appointment.id)}
          variant="outline"
          className="w-full gap-1"
        >
          View Details <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const AppointmentDetails = ({
  appointmentId,
  onClose,
  onComplete,
}: {
  appointmentId: string;
  onClose: () => void;
  onComplete: (id: string) => void;
}) => {
  const appointment = APPOINTMENTS.find((a) => a.id === appointmentId);
  const [transferInProgress, setTransferInProgress] = useState(false);
  const [viewDeed, setViewDeed] = useState(false);

  if (!appointment) {
    return (
      <div className="p-6 text-center">
        <p>Appointment not found</p>
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </div>
    );
  }

  const handleCompleteTransfer = () => {
    setTransferInProgress(true);

    setTimeout(() => {
      setTransferInProgress(false);
      onComplete(appointmentId);
      toast.success("Property transfer completed successfully!");
    }, 2000);
  };

  const timeLeft = calculateTimeLeft(appointment.date, appointment.time);

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{appointment.title}</CardTitle>
            <CardDescription>Appointment ID: {appointment.id}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-14rem)] space-y-6 overflow-auto">
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="mb-3 font-medium">Appointment Details</h3>
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
                    <p className="text-xs text-amber-500">Time Left</p>
                    <p className="font-medium text-amber-600">{timeLeft}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-medium">Property Information</h3>
          <Card>
            <CardContent className="">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-medium">{appointment.propertyTitle}</p>
                  <p className="text-muted-foreground text-xs">
                    {appointment.propertyAddress}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-muted-foreground text-xs">Sale Price</p>
                    <p className="font-medium">{appointment.propertyPrice}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Property ID</p>
                    <p className="font-medium">{appointment.propertyId}</p>
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
              <CardContent className="">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs">Seller</p>
                    <p className="font-medium">{appointment.seller.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {appointment.seller.contactNumber}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      appointment.seller.isVerified
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-amber-200 bg-amber-50 text-amber-600"
                    }
                  >
                    {appointment.seller.isVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <div className="mt-2">
                  <p className="text-muted-foreground text-xs">Consent</p>
                  <Badge
                    variant="outline"
                    className={
                      appointment.seller.hasConsented
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-amber-200 bg-amber-50 text-amber-600"
                    }
                  >
                    {appointment.seller.hasConsented ? "Given" : "Pending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs">Buyer</p>
                    <p className="font-medium">{appointment.buyer.name}</p>
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
                    {appointment.buyer.isVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <div className="mt-2">
                  <p className="text-muted-foreground text-xs">Consent</p>
                  <Badge
                    variant="outline"
                    className={
                      appointment.buyer.hasConsented
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-amber-200 bg-amber-50 text-amber-600"
                    }
                  >
                    {appointment.buyer.hasConsented ? "Given" : "Pending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-medium">Documents Verification</h3>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
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
                      <p className="text-muted-foreground text-xs">
                        Generated:{" "}
                        {new Date(
                          appointment.documents.salesDeed.generatedDate,
                        ).toLocaleDateString()}
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
                      {appointment.documents.stampDuty.status === "paid" && (
                        <p className="text-muted-foreground text-xs">
                          Receipt: {appointment.documents.stampDuty.receiptNo}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      appointment.documents.stampDuty.status === "paid"
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-amber-200 bg-amber-50 text-amber-600"
                    }
                  >
                    {appointment.documents.stampDuty.status === "paid"
                      ? "Paid"
                      : "Pending"}
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
                      {appointment.documents.registrationFee.status ===
                        "paid" && (
                        <p className="text-muted-foreground text-xs">
                          Receipt:{" "}
                          {appointment.documents.registrationFee.receiptNo}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      appointment.documents.registrationFee.status === "paid"
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-amber-200 bg-amber-50 text-amber-600"
                    }
                  >
                    {appointment.documents.registrationFee.status === "paid"
                      ? "Paid"
                      : "Pending"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {appointment.status !== "completed" && (
          <Button
            onClick={handleCompleteTransfer}
            disabled={
              transferInProgress ||
              appointment.documents.salesDeed.status !== "approved" ||
              appointment.documents.stampDuty.status !== "paid" ||
              appointment.documents.registrationFee.status !== "paid" ||
              !appointment.seller.hasConsented ||
              !appointment.buyer.hasConsented
            }
          >
            {transferInProgress ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Processing...
              </>
            ) : (
              <>Complete Property Transfer</>
            )}
          </Button>
        )}
      </CardFooter>

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
                  The SELLER, residing at [Seller Address], hereinafter called
                  the &quot;SELLER&quot; of the ONE PART,
                </p>

                <p>AND</p>

                <p className="font-medium">
                  The BUYER, residing at [Buyer Address], hereinafter called the
                  &quot;BUYER&quot; of the OTHER PART.
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
    </Card>
  );
};

export default function AuthorityAppointments() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null,
  );
  const [localAppointments, setLocalAppointments] = useState(APPOINTMENTS);

  const upcomingAppointments = localAppointments.filter(
    (app) =>
      (app.status === "confirmed" || app.status === "scheduled") &&
      new Date(app.date) >= new Date(),
  );

  const completedAppointments = localAppointments.filter(
    (app) => app.status === "completed",
  );

  let filteredAppointments =
    activeTab === "upcoming" ? upcomingAppointments : completedAppointments;

  if (dateFilter === "today") {
    filteredAppointments = filteredAppointments.filter(
      (app) => new Date(app.date).toDateString() === new Date().toDateString(),
    );
  } else if (dateFilter === "upcoming") {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    filteredAppointments = filteredAppointments.filter(
      (app) =>
        new Date(app.date) >= new Date() && new Date(app.date) <= nextWeek,
    );
  } else if (dateFilter === "month") {
    const today = new Date();
    filteredAppointments = filteredAppointments.filter(
      (app) =>
        new Date(app.date).getMonth() === today.getMonth() &&
        new Date(app.date).getFullYear() === today.getFullYear(),
    );
  }

  if (statusFilter !== "all") {
    filteredAppointments = filteredAppointments.filter(
      (app) => app.status === statusFilter,
    );
  }

  const searchedAppointments = filteredAppointments.filter(
    (app) =>
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCompleteTransfer = (id: string) => {
    setLocalAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === id ? { ...app, status: "completed" } : app,
      ),
    );
    setSelectedAppointment(null);
  };

  return (
    <div className="container flex h-screen flex-col overflow-hidden p-4">
      <div className="grid h-[calc(100vh-6rem)] flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-3">
        <div className="flex h-full flex-col overflow-hidden lg:col-span-1">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Appointments</CardTitle>
              <CardDescription>
                Manage property registration appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">
                    Upcoming ({upcomingAppointments.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed ({completedAppointments.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mt-4 space-y-4">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs">
                      Filter by date
                    </p>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All dates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All dates</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="upcoming">Next 7 days</SelectItem>
                        <SelectItem value="month">This month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs">
                      Filter by status
                    </p>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All of them" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All of them</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1 overflow-auto">
            <ScrollArea className="h-full pr-4">
              {searchedAppointments.length > 0 ? (
                <div className="grid gap-4 pb-6">
                  {searchedAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onSelect={setSelectedAppointment}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CalendarIcon className="text-muted-foreground mx-auto mb-3 h-8 w-8" />
                  <h3 className="mb-1 font-medium">No appointments found</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {searchQuery
                      ? "Try adjusting your search filters"
                      : activeTab === "upcoming"
                        ? "You have no upcoming appointments"
                        : "You have no completed appointments"}
                  </p>
                </Card>
              )}
            </ScrollArea>
          </div>
        </div>

        <div className="h-full overflow-hidden lg:col-span-2">
          {selectedAppointment ? (
            <AppointmentDetails
              appointmentId={selectedAppointment}
              onClose={() => setSelectedAppointment(null)}
              onComplete={handleCompleteTransfer}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border text-center">
              <CalendarIcon className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-medium">
                No Appointment Selected
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Select an appointment from the list to view details and complete
                the property transfer process.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
