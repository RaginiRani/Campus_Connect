"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home after logout
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        Logout
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
