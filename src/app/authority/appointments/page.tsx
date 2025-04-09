import React from "react";

export default function AuthorityAppointments() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Appointments</h1>
      <div className="bg-card mb-6 rounded-lg p-6 shadow-md">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-semibold">Today&apos;s Schedule</h2>
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
            Add Appointment
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-background rounded-lg p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">9:00 AM</span>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                Confirmed
              </span>
            </div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-muted-foreground text-sm">
              Property Verification
            </p>
            <div className="mt-2 flex gap-2">
              <button className="text-primary text-sm">Reschedule</button>
              <button className="text-destructive text-sm">Cancel</button>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">11:30 AM</span>
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                Pending
              </span>
            </div>
            <h3 className="font-medium">Jane Smith</h3>
            <p className="text-muted-foreground text-sm">Document Submission</p>
            <div className="mt-2 flex gap-2">
              <button className="text-primary text-sm">Reschedule</button>
              <button className="text-destructive text-sm">Cancel</button>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">2:00 PM</span>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                Confirmed
              </span>
            </div>
            <h3 className="font-medium">Mike Johnson</h3>
            <p className="text-muted-foreground text-sm">
              Property Registration
            </p>
            <div className="mt-2 flex gap-2">
              <button className="text-primary text-sm">Reschedule</button>
              <button className="text-destructive text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
