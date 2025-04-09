import React from "react";

export default function AuthorityVerifications() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Property Verifications</h1>
      <div className="bg-card mb-6 rounded-lg p-6 shadow-md">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-semibold">Pending Verifications</h2>
          <div className="flex gap-2">
            <select className="bg-background border-input rounded-md border px-3 py-2">
              <option value="all">All Properties</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Search properties..."
              className="bg-background border-input rounded-md border px-3 py-2"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Property ID</th>
                <th className="py-2 text-left">Owner</th>
                <th className="py-2 text-left">Location</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">PROP001</td>
                <td className="py-3">John Doe</td>
                <td className="py-3">123 Main St</td>
                <td className="py-3">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-primary mr-2">View</button>
                  <button className="mr-2 text-green-600">Verify</button>
                  <button className="text-destructive">Reject</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3">PROP002</td>
                <td className="py-3">Jane Smith</td>
                <td className="py-3">456 Park Ave</td>
                <td className="py-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    Verified
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-primary mr-2">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
