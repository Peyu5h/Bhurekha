import React from "react";

export default function DocumentVault() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Document Vault</h1>
      <div className="bg-card mb-6 rounded-lg p-6 shadow-md">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">My Documents</h2>
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
            Upload Document
          </button>
        </div>
        <div className="mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Document Name</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Date Added</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">Property Deed</td>
                <td className="py-3">Legal Document</td>
                <td className="py-3">2023-05-15</td>
                <td className="py-3">
                  <button className="text-primary mr-2">View</button>
                  <button className="text-destructive">Delete</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Tax Receipt</td>
                <td className="py-3">Financial</td>
                <td className="py-3">2023-06-20</td>
                <td className="py-3">
                  <button className="text-primary mr-2">View</button>
                  <button className="text-destructive">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
