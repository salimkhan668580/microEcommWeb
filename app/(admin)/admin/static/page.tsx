import React from "react";
import StaticManagement from "@/src/components/Admin/StaticManagement/StaticManagement";

export const metadata = {
  title: "Static Content Management | Admin Portal",
  description:
    "Manage FAQs, Contact Us, About Us, Privacy Policy, and Terms of Service",
};

export default function AdminStaticPage() {
  return <StaticManagement />;
}

