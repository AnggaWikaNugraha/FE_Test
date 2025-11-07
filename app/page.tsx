"use client";

import Image from "next/image";
import ProtectedRoute from "./lib/protect-routes";
import { useAuth } from "./lib/_context/AuthContext";

export default function Home() {
  

  return (
    <ProtectedRoute>
      <div>
        tes
      </div>
    </ProtectedRoute>
  );
}
