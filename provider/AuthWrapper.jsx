"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AuthWrapper = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true); // ✅ Wait before rendering
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current route

  useEffect(() => {
    // const token = localStorage.getItem("authToken");

    // if (!token) {
    //   // ✅ If NOT logged in, redirect to login page
    //   if (pathname !== "/en") {
    //     router.replace("/en");
    //   }
    // } 
    // else {
    //   // ✅ If logged in, redirect to dashboard (except when already there)
    //   if (pathname === "/en" || pathname === "/") {
    //     router.replace("/en/dashboard");
    //   }
    // }

    setCheckingAuth(false); // ✅ Simulating loading effect
  }, [router, pathname]);

  // ✅ Show loading indicator while checking authentication
  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;

