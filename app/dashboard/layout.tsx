"use client";

import React from "react";
import Sidebar from "../_components/sidebar";
import Header from "../_components/header";
import ProtectedRoute from "../lib/protect-routes";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
