import React from "react";

export default function UserSettings() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <div className="bg-card mb-6 rounded-lg p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">Change Password</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-md border p-2"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-md border p-2"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-md border p-2"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <button className="bg-primary text-primary-foreground mt-4 rounded-md px-4 py-2">
              Update Password
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
          <div>
            <h3 className="mb-4 text-lg font-medium">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Profile Visibility</h4>
                  <p className="text-muted-foreground text-sm">
                    Control who can see your profile
                  </p>
                </div>
                <select className="rounded-md border p-2">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
