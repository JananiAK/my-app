"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2 border rounded-lg p-4 bg-card">

          <Button
            variant="ghost"
            className="w-full justify-start font-semibold bg-muted"
          >
            Overview
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            Orders
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            Addresses
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            Account Details
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            Logout
          </Button>

        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">

          {/* Greeting */}
          <div>
            <h1 className="font-serif text-3xl font-bold">
              Hello, John
            </h1>

            <p className="text-muted-foreground">
              Welcome to your account dashboard.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-sm text-muted-foreground">
                Total Orders
              </h3>

              <p className="text-3xl font-bold mt-2">
                12
              </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-sm text-muted-foreground">
                Pending Dispatch
              </h3>

              <p className="text-3xl font-bold mt-2">
                2
              </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-sm text-muted-foreground">
                Total Spend
              </h3>

              <p className="text-3xl font-bold mt-2">
                {formatPrice(45000)}
              </p>
            </div>

          </div>

          {/* Recent Orders */}
          <div>

            <h2 className="font-serif text-2xl font-bold mb-4">
              Recent Orders
            </h2>

            <div className="border rounded-lg overflow-hidden">

              <table className="w-full text-sm text-left">

                <thead className="bg-muted text-muted-foreground border-b">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>

                <tbody className="divide-y">

                  <tr>
                    <td className="p-4">#ORD-3829</td>

                    <td className="p-4">Feb 09, 2026</td>

                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                        Processing
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      {formatPrice(12999)}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">#ORD-3810</td>

                    <td className="p-4">Jan 25, 2026</td>

                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        Delivered
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      {formatPrice(5499)}
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}