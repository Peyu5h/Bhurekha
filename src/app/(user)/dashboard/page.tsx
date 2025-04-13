"use client";

import React from "react";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import {
  Building2,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Bell,
  MapPin,
  Check,
  User,
  ArrowRight,
  ChevronRight,
  BarChart3,
  CircleCheck,
  CircleDashed,
  Circle,
} from "lucide-react";

const registrySteps = [
  { phase: "ADDED_PROPERTY", status: "COMPLETED", date: "2024-03-01" },
  { phase: "DOCUMENT_UPLOAD", status: "COMPLETED", date: "2024-03-05" },
  { phase: "DOCUMENT_VERIFICATION", status: "IN_PROGRESS", date: "2024-03-10" },
  { phase: "PROPERTY_LISTED", status: "PENDING", date: null },
  { phase: "STAMP_DUTY_PAYMENT", status: "PENDING", date: null },
  { phase: "AGREEMENT_SIGNING", status: "PENDING", date: null },
  { phase: "NFT_HANDOVER", status: "PENDING", date: null },
];

const propertyDeal = {
  id: "PRJ-2024-001",
  type: "SALE",
  status: "IN_PROGRESS",
  currentPhase: "DOCUMENT_VERIFICATION",
  progress: 35,
  property: {
    address: "123, Shastri Nagar, Mumbai, Maharashtra 400001",
    type: "Residential",
    area: "1200 sq.ft",
    price: "₹1,25,00,000",
  },
  seller: {
    name: "Ramesh Patel",
    id: "USR-2024-001",
    avatarUrl:
      "https://images.unsplash.com/photo-1645036915593-b4ed7e016b65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMG1lbiUyMHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
  },
  buyer: {
    name: "Suresh Kumar",
    id: "USR-2024-002",
    avatarUrl:
      "https://images.unsplash.com/photo-1739958742515-6fe41e461664?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGluZGlhbiUyMG1lbiUyMHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
  },
  timeline: registrySteps,
};

const stats = {
  totalProperties: 3,
  activeDeals: 1,
  completedDeals: 2,
  documentsUploaded: 12,
};

const recentActivities = [
  {
    id: 1,
    type: "MESSAGE",
    sender: "Ramesh Patel",
    message: "sent you a message regarding property",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "INTEREST",
    sender: "Sunil Verma",
    message: "showed interest in your property",
    time: "3 hours ago",
  },
  {
    id: 3,
    type: "APPROVAL",
    sender: "Sub Registrar",
    message: "approved your property listing",
    time: "1 day ago",
  },
  {
    id: 4,
    type: "MESSAGE",
    sender: "Ramesh Patel",
    message: "requested additional documents",
    time: "2 days ago",
  },
  {
    id: 5,
    type: "APPROVAL",
    sender: "Land Registry Office",
    message: "verified your KYC details",
    time: "3 days ago",
  },
  {
    id: 6,
    type: "APPROVAL",
    sender: "Land Registry Office",
    message: "verified your KYC details",
    time: "3 days ago",
  },
  {
    id: 7,
    type: "APPROVAL",
    sender: "Land Registry Office",
    message: "verified your KYC details",
    time: "3 days ago",
  },
  {
    id: 8,
    type: "APPROVAL",
    sender: "Land Registry Office",
    message: "verified your KYC details",
    time: "3 days ago",
  },
  {
    id: 9,
    type: "APPROVAL",
    sender: "Land Registry Office",
    message: "verified your KYC details",
    time: "3 days ago",
  },
];

const upcomingAppointments = [
  {
    id: 1,
    title: "Document Verification",
    date: "2024-03-15",
    time: "10:00 AM",
    location: "Sub Registrar Office, Andheri East",
    with: "Sub Registrar Dept.",
    daysLeft: 3,
  },
];

export default function Dashboard() {
  const { user } = useWalletAuth();
  const [isBuyer, setIsBuyer] = React.useState(true);

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CircleCheck className="h-4 w-4 text-green-500" />;
      case "IN_PROGRESS":
        return <CircleDashed className="h-4 w-4 text-blue-500" />;
      case "PENDING":
        return <Circle className="h-4 w-4 text-gray-300" />;
      default:
        return <Circle className="h-4 w-4 text-gray-300" />;
    }
  };

  return (
    <div className="overflow-auto p-4 md:max-h-screen md:overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Link href="/properties">
          <Card className="hover:border-primary/30 cursor-pointer gap-0 p-0 transition-all hover:shadow-md">
            <CardHeader className="mb-0 border-b p-0 pb-0 [.border-b]:pb-0">
              <div className="flex items-center justify-between px-4 py-2">
                <CardTitle className="text-sm font-medium">
                  Properties
                </CardTitle>
                <Building2 className="text-muted-foreground h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-muted-foreground text-xs">All categories</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/properties">
          <Card className="hover:border-primary/30 cursor-pointer gap-0 p-0 transition-all hover:shadow-md">
            <CardHeader className="mb-0 border-b p-0 pb-0 [.border-b]:pb-0">
              <div className="flex items-center justify-between px-4 py-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <Clock className="text-muted-foreground h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.activeDeals}</div>
              <p className="text-muted-foreground text-xs">Deals</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/properties">
          <Card className="hover:border-primary/30 cursor-pointer gap-0 p-0 transition-all hover:shadow-md">
            <CardHeader className="mb-0 border-b p-0 pb-0 [.border-b]:pb-0">
              <div className="flex items-center justify-between px-4 py-2">
                <CardTitle className="text-sm font-medium">Sold</CardTitle>
                <CheckCircle2 className="text-muted-foreground h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.completedDeals}</div>
              <p className="text-muted-foreground text-xs">Processed</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/appointments">
          <Card className="hover:border-primary/30 cursor-pointer gap-0 p-0 transition-all hover:shadow-md">
            <CardHeader className="mb-0 border-b p-0 pb-0 [.border-b]:pb-0">
              <div className="flex items-center justify-between px-4 py-2">
                <CardTitle className="hidden text-sm font-medium md:flex">
                  Upcoming Appointment
                </CardTitle>
                <CardTitle className="text-sm font-medium md:hidden">
                  Appointment
                </CardTitle>
                <Calendar className="text-muted-foreground hidden h-4 w-4 sm:flex" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="flex-row text-[10px] font-medium sm:flex-col sm:text-xs">
                        {new Date(appointment.date).toLocaleDateString()}{" "}
                        <span className="hidden sm:inline">-</span>{" "}
                        {appointment.time}
                      </h3>
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-[10px]"
                      >
                        <span className="hidden sm:inline">In</span>{" "}
                        {appointment.daysLeft} days
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="mt-[10px] flex items-center gap-1 text-[8px] sm:text-xs">
                        <MapPin className="text-muted-foreground h-4 w-4" />
                        <span className="truncate">{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-6">
                  <Calendar className="text-muted-foreground/50 mb-2 h-10 w-10" />
                  <p className="text-muted-foreground text-center text-sm">
                    No upcoming appointments
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Schedule Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="scrollbar flex h-auto flex-col gap-0 overflow-auto p-0 md:col-span-2 md:h-[calc(100vh-36%)]">
          <CardHeader className="mb-0 border-b p-0 pb-0 [.border-b]:pb-0">
            <div className="flex items-center justify-between px-4 py-2">
              <div>
                <CardTitle className="text-base">
                  Active Property Deal
                </CardTitle>
                <CardDescription className="text-xs">
                  Registration in progress
                </CardDescription>
              </div>
              <Link href={`/properties/${propertyDeal.id}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  View <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>

          <div className="from-primary/5 bg-gradient-to-r to-transparent p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="truncate text-sm font-semibold">
                  {propertyDeal.property.address}
                </h3>
                <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 text-xs">
                  <div className="flex items-center">
                    <Building2 className="mr-1 h-3.5 w-3.5" />
                    {propertyDeal.property.type}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    {propertyDeal.property.area}
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">
                      {propertyDeal.property.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center border-t border-b p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img
                  src={
                    isBuyer
                      ? propertyDeal.seller.avatarUrl
                      : propertyDeal.buyer.avatarUrl
                  }
                  alt={
                    isBuyer ? propertyDeal.seller.name : propertyDeal.buyer.name
                  }
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium">
                  {isBuyer ? propertyDeal.seller.name : propertyDeal.buyer.name}
                </h4>
                <p className="text-muted-foreground text-xs">
                  {isBuyer ? "Seller" : "Buyer"}
                </p>
              </div>
            </div>
            <Button size="sm" className="ml-auto gap-1" variant="outline">
              <MessageSquare className="h-3.5 w-3.5" />
              Message
            </Button>
          </div>

          <div className="flex h-[300px] flex-1 flex-col md:h-[250px]">
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-primary h-4 w-4" />
                  <span className="text-sm font-medium">
                    Registration Progress
                  </span>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary">
                  {propertyDeal.progress}%
                </Badge>
              </div>

              <div className="mb-4 flex w-full flex-col space-y-1">
                <Progress
                  value={propertyDeal.progress}
                  className="h-2.5 rounded-full"
                />
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Start</span>
                  <span>In Progress</span>
                  <span>Complete</span>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 px-4 pb-4">
              <div className="relative pl-6">
                <div className="space-y-4">
                  {propertyDeal.timeline.map((phase, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-6 mt-0.5">
                        {getPhaseIcon(phase.status)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
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
                            className="h-5 text-xs"
                          >
                            {phase.status.replace(/_/g, " ")}
                          </Badge>
                        </div>
                        {phase.date && (
                          <span className="text-muted-foreground text-xs">
                            {new Date(phase.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </Card>

        <Card className="scrollbar flex h-auto flex-col gap-0 overflow-auto p-0 md:h-[calc(100vh-36%)]">
          <CardHeader className="mb-0 border-b p-0 pb-0 [.border-b]:pb-0">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <Bell className="text-primary h-4 w-4" />
                <CardTitle className="text-sm">Recent Activities</CardTitle>
              </div>
              <Badge variant="outline" className="bg-primary/5 h-5 text-xs">
                {recentActivities.length} updates
              </Badge>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 border-b px-3 py-3 last:border-0"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    activity.type === "MESSAGE"
                      ? "bg-blue-100"
                      : activity.type === "INTEREST"
                        ? "bg-green-100"
                        : "bg-orange-100"
                  }`}
                >
                  {activity.type === "MESSAGE" ? (
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  ) : activity.type === "INTEREST" ? (
                    <User className="h-4 w-4 text-green-600" />
                  ) : (
                    <Check className="h-4 w-4 text-orange-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.sender}</span>{" "}
                    {activity.message}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
