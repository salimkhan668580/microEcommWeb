import React from "react";
import CouponManagement from "@/src/components/Admin/CouponManagement/CouponManagement";

export const metadata = {
  title: "Coupon Management | Admin Portal",
  description: "Create and manage promotional discount coupons and voucher codes",
};

export default function AdminCouponsPage() {
  return <CouponManagement />;
}

