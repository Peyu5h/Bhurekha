"use client";

import React from "react";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "~/components/ui/badge";

const upcomingAppointments = [
  {
    id: 1,
    title: "Document Verification",
    date: "2024-03-15",
    time: "10:00 AM",
    location: "Sub Registrar Office, Andheri East",
    with: "Sub Registrar Dept.",
    status: "confirmed",
    daysLeft: 3,
  },
  {
    id: 2,
    title: "Property Inspection",
    date: "2024-03-20",
    time: "2:00 PM",
    location: "Property Site, Mumbai",
    with: "Land Inspector",
    status: "pending",
    daysLeft: 8,
  },
];

export default function Appointments() {
  const { user } = useWalletAuth();

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Appointments</h1>
      </div>

      {upcomingAppointments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <div className="border-b p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{appointment.title}</h3>
                  <Badge
                    variant={
                      appointment.status === "confirmed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground mt-2 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(appointment.date).toLocaleDateString()} at{" "}
                      {appointment.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{appointment.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>In {appointment.daysLeft} days</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 p-3">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:border-destructive"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border p-12">
          <Calendar className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="mb-2 text-xl font-medium">No Appointments</h3>
          <p className="text-muted-foreground mb-6 text-center">
            You don&apos;t have any appointments scheduled. Would you like to
            schedule one?
          </p>
          <Button>Schedule Appointment</Button>
        </div>
      )}
    </div>
  );
}
