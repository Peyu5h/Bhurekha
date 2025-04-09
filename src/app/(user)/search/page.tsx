import React from "react";

export default function SearchProperties() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Search Properties</h1>
      <div className="bg-card mb-6 rounded-lg p-6 shadow-md">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Location</label>
            <input
              type="text"
              className="bg-background border-input w-full rounded-md border px-3 py-2"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Property Type
            </label>
            <select className="bg-background border-input w-full rounded-md border px-3 py-2">
              <option value="">Select type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Price Range
            </label>
            <select className="bg-background border-input w-full rounded-md border px-3 py-2">
              <option value="">Select range</option>
              <option value="0-100000">₹0 - ₹100,000</option>
              <option value="100000-500000">₹100,000 - ₹500,000</option>
              <option value="500000-1000000">₹500,000 - ₹1,000,000</option>
              <option value="1000000+">₹1,000,000+</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
            Search
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Search results will go here */}
      </div>
    </div>
  );
}
