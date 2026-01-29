'use client'

import Sidebar from "@/components/Sidebar";
import DashboardView from "@/components/views/DashboardView"; // Import your new views
import OrderView from "@/components/views/OrderView";
import MenuView from "@/components/views/MenuView";
import { useState } from "react";

export default function Home() {
  const [activeNav, setActiveNav] = useState('order');

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(today);

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardView formattedDate={formattedDate} />;
      case 'order':
        return <OrderView formattedDate={formattedDate} />;
      case 'menu':
        return <MenuView />;
      default:
        return <DashboardView formattedDate={formattedDate} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#252836] text-white">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {renderContent()}
    </div>
  );
}