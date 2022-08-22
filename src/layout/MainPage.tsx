import React from "react";
import { useLocation } from "react-router-dom";

export default function MainPage() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <p>
      {pathname?.includes("1")
        ? "一级"
        : pathname?.includes("2")
        ? "二级"
        : "三级"}
      页面！！！
    </p>
  );
}
