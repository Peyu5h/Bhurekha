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
  ArrowRight,
  Check,
  Calendar as CalendarIcon,
  AlertCircle,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "~/components/ui/scroll-area";

// Mock appointments data with more examples
const APPOINTMENTS = [
  {
    id: "APT-2024-002",
    title: "Property Registration",
    propertyId: "PRJ-2024-002",
    propertyTitle: "Villa in Koregaon Park",
    propertyAddress: "45, Koregaon Park, Pune, Maharashtra 411001",
    date: new Date(new Date().setDate(new Date().getDate() - 15))
      .toISOString()
      .split("T")[0],
    time: "10:30 AM",
    location: "Sub-Registrar Office, Pune Camp",
    status: "completed",
  },
  {
    id: "APT-2024-003",
    title: "Property Registration",
    propertyId: "PRJ-2024-003",
    propertyTitle: "Agricultural Land in Nagpur",
    propertyAddress: "Survey No. 123, Kalmeshwar, Nagpur, Maharashtra 440001",
    date: new Date(new Date().setDate(new Date().getDate() + 10))
      .toISOString()
      .split("T")[0],
    time: "02:00 PM",
    location: "Sub-Registrar Office, Nagpur West",
    status: "scheduled",
  },

  {
    id: "APT-2024-005",
    title: "Property Registration",
    propertyId: "PRJ-2024-005",
    propertyTitle: "Residential Plot in Lonavala",
    propertyAddress:
      "Plot No. 42, Hill View Society, Lonavala, Maharashtra 410401",
    date: new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0],
    time: "01:00 PM",
    location: "Sub-Registrar Office, Lonavala",
    status: "completed",
  },
];

const calculateTimeLeft = (date: string, time: string) => {
  const appointmentDate = new Date(
    `${date}T${time.replace(" AM", ":00").replace(" PM", ":00")}`,
  );
  const now = new Date();

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

const AppointmentCard = ({
  appointment,
}: {
  appointment: (typeof APPOINTMENTS)[0];
}) => {
  const timeLeft = calculateTimeLeft(appointment.date, appointment.time);
  const isPast =
    new Date(
      `${appointment.date}T${appointment.time.replace(" AM", ":00").replace(" PM", ":00")}`,
    ) < new Date();
  const isToday =
    new Date(appointment.date).toDateString() === new Date().toDateString();

  return (
    <Link href={`/appointments/${appointment.id}`}>
      <Card className="hover:border-primary/30 h-full transition-all hover:shadow-md">
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
              {appointment.status === "completed"
                ? "Completed"
                : appointment.status === "confirmed"
                  ? "Confirmed"
                  : "Scheduled"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="font-medium">{appointment.propertyTitle}</p>
              <p className="text-muted-foreground truncate text-sm">
                {appointment.propertyAddress}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-xs">Date</p>
                  <p className="font-medium">
                    {new Date(appointment.date).toLocaleDateString()}
                    {isToday && (
                      <Badge variant="outline" className="ml-1 text-xs">
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
              <div className="flex items-center gap-2">
                <MapPin className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-xs">Location</p>
                  <p className="truncate font-medium">{appointment.location}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function Appointments() {
  const upcomingAppointments = APPOINTMENTS.filter(
    (app) =>
      (app.status === "confirmed" || app.status === "scheduled") &&
      new Date(
        `${app.date}T${app.time.replace(" AM", ":00").replace(" PM", ":00")}`,
      ) >= new Date(),
  ).sort(
    (a, b) =>
      new Date(
        `${a.date}T${a.time.replace(" AM", ":00").replace(" PM", ":00")}`,
      ).getTime() -
      new Date(
        `${b.date}T${b.time.replace(" AM", ":00").replace(" PM", ":00")}`,
      ).getTime(),
  );

  const pastAppointments = APPOINTMENTS.filter(
    (app) => app.status === "completed",
  ).sort(
    (a, b) =>
      new Date(
        `${b.date}T${b.time.replace(" AM", ":00").replace(" PM", ":00")}`,
      ).getTime() -
      new Date(
        `${a.date}T${a.time.replace(" AM", ":00").replace(" PM", ":00")}`,
      ).getTime(),
  );

  if (APPOINTMENTS.length === 0) {
    return (
      <div className="container mx-auto flex h-screen flex-col overflow-hidden p-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">My Appointments</h1>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border">
          <CalendarIcon className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="mb-2 text-xl font-medium">No Appointments</h3>
          <p className="text-muted-foreground mb-6 text-center">
            You don&apos;t have any appointments scheduled. You can schedule an
            appointment after completing the property purchase process.
          </p>
          <Button asChild>
            <Link href="/search">View Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex h-screen flex-col overflow-hidden p-4">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">My Appointments</h1>
      </div>

      <Tabs
        defaultValue="upcoming"
        className="flex flex-1 flex-col overflow-hidden"
      >
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="flex-1 overflow-hidden">
          {upcomingAppointments.length > 0 ? (
            <ScrollArea className="h-full pr-4">
              <div className="grid gap-4 pb-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border">
              <CalendarIcon className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-medium">
                No Upcoming Appointments
              </h3>
              <p className="text-muted-foreground mb-6 text-center">
                You don&apos;t have any upcoming appointments scheduled.
              </p>
              <Button asChild>
                <Link href="/search">View Properties</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="flex-1 overflow-hidden">
          {pastAppointments.length > 0 ? (
            <ScrollArea className="h-full pr-4">
              <div className="grid gap-4 pb-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {pastAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border">
              <CalendarIcon className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-medium">No Past Appointments</h3>
              <p className="text-muted-foreground mb-6 text-center">
                You don&apos;t have any past appointments.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
