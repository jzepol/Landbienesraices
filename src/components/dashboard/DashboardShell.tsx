"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardShellProps {
  children: React.ReactNode;
  userName?: string | null;
}

export default function DashboardShell({ children, userName }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          userName={userName}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}