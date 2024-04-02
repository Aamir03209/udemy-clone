import React from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full">
        <Navbar />
      </div>
      <div className="hidden md:flex w-56 inset-y-0 h-full flex-col fixed z-50">
        <Sidebar />
      </div>
      <main className="md:ml-56 pt-[80px] h-full ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
