import React from "react";

export default function UserProfile() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      <div className="bg-card mb-6 rounded-lg p-6 shadow-md">
        <div className="mb-6 flex items-center">
          <div className="bg-muted mr-4 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="text-2xl">JD</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-medium">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <p className="mt-1">John Doe</p>
              </div>
              <div>
                <label className="text-sm font-medium">Mobile Number</label>
                <p className="mt-1">+91 9876543210</p>
              </div>
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <p className="mt-1">01/01/1990</p>
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <p className="mt-1">Male</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Address</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Office Address</label>
                <p className="mt-1">123 Main Street, City, State 12345</p>
              </div>
              <div>
                <label className="text-sm font-medium">
                  Residential Address
                </label>
                <p className="mt-1">456 Park Avenue, City, State 12345</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
