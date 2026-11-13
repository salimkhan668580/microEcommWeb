import React from "react";
import OrderManagement from "@/src/components/Admin/OrderManagement/OrderManagement";

export const metadata = {
  title: "Order Management | Admin Portal",
  description: "Track customer orders, manage fulfillment and payments",
};

export default function AdminOrderPage() {
  return <OrderManagement />;
}

