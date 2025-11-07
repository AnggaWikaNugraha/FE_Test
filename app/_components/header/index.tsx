"use client";
import { useAuth } from "@/app/lib/_context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : null;

  return (
    <header className="flex items-center justify-end px-6 py-3 bg-white border-b shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center bg-sky-500 text-white font-semibold rounded-full">
          {initials}
        </div>
        <span className="text-gray-700 font-medium">{user?.name}</span>
        <button
          onClick={logout}
          className="ml-2 text-sm text-red-500 hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
