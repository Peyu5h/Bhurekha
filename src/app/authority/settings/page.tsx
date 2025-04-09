import React from "react";

export default function AuthoritySettings() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <div className="bg-card mb-6 rounded-lg p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Authority Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">Profile Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Department ID
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border p-2"
                  placeholder="Enter department ID"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Designation
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border p-2"
                  placeholder="Enter designation"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Office Address
                </label>
                <textarea
                  className="w-full rounded-md border p-2"
                  placeholder="Enter office address"
                  rows={3}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border p-2"
                  placeholder="Enter contact number"
                />
              </div>
            </div>
            <button className="bg-primary text-primary-foreground mt-4 rounded-md px-4 py-2">
              Update Profile
            </button>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Working Hours</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Start Time
                </label>
                <input type="time" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  End Time
                </label>
                <input type="time" className="w-full rounded-md border p-2" />
              </div>
            </div>
            <button className="bg-primary text-primary-foreground mt-4 rounded-md px-4 py-2">
              Update Schedule
            </button>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-muted-foreground text-sm">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer after:peer-checked:bg-primary h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:peer-checked:translate-x-5"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-muted-foreground text-sm">
                    Receive updates via SMS
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer after:peer-checked:bg-primary h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
