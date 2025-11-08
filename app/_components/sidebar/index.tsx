"use client";
import { useState } from "react";
import {
  Home,
  Layers,
  Mail,
  ShoppingBag,
  Folder,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menu = [
    { icon: <Home size={18} />, label: "Dashboard", href: "/dashboard/main" },
    {
      icon: <Layers size={18} />,
      label: "Laporan Lalin",
      children: [
        { label: "Laporan perhari", href: "/dashboard/lalin" },
      ],
    },
    { icon: <Folder size={18} />, label: "Master Gerbang", href: "/dashboard/master-gerbang" },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col shadow-xl">
      <div className="px-6 py-5 text-xl font-semibold tracking-wide border-b border-slate-700">
        Jasa Marga
      </div>

      <nav className="flex-1 p-4 space-y-1 text-sm">
        {menu.map((item, idx) => (
          <div key={idx}>
            {item.children ? (
              <>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex w-full items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700/50 transition"
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="ml-8 mt-1 space-y-1 text-gray-300">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-2 py-1 rounded-md hover:bg-slate-700/30 hover:text-sky-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition"
              >
                {item.icon}
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="text-xs text-slate-400 text-center py-3 border-t border-slate-700">
        v1.0.0
      </div>
    </aside>
  );
}
