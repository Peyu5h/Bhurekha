import React from "react";

export default function AuthorityDashboard() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Authority Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Pending Verifications</h2>
          <p className="text-muted-foreground mb-4">
            5 properties awaiting verification
          </p>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
              View All
            </button>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">
            Today&apos;s Appointments
          </h2>
          <p className="text-muted-foreground mb-4">3 appointments scheduled</p>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
              View Schedule
            </button>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Recent Documents</h2>
          <p className="text-muted-foreground mb-4">
            12 documents uploaded today
          </p>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
              View Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
