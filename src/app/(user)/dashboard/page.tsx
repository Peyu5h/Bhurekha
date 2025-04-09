import React from "react";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";

export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">My Properties</h2>
          <p className="text-muted-foreground mb-4">
            View and manage your properties
          </p>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
              View Properties
            </button>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Document Vault</h2>
          <p className="text-muted-foreground mb-4">
            Access your property documents
          </p>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
              Open Vault
            </button>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Appointments</h2>
          <p className="text-muted-foreground mb-4">
            Schedule and manage appointments
          </p>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
              View Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
