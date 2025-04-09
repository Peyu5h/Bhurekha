import React from "react";

export default function UserProperties() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">My Properties</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Property cards will go here */}
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">Sample Property</h2>
          <p className="text-muted-foreground mb-4">
            This is a sample property card.
          </p>
          <div className="flex justify-end">
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
