// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const AuthWrapper = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       router.replace("/en"); // Redirect if no auth token
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [router]);

//   if (!isAuthenticated) {
//     return <div className="flex justify-center items-center h-screen">Checking authentication...</div>;
//   }

//   return <>{children}</>;
// };

// export default AuthWrapper;


// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const AuthWrapper = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume authenticated initially
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       router.replace("/en"); // ✅ Redirect immediately
//       setIsAuthenticated(false);
//     }
//   }, [router]);

//   return <>{children}</>;
// };

// export default AuthWrapper;

// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// const AuthWrapper = ({ children }) => {
//   const [checkingAuth, setCheckingAuth] = useState(true); // ✅ Wait before rendering
//   const router = useRouter();
//   const pathname = usePathname(); // ✅ Get current route

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       // ✅ If NOT logged in, redirect to login page
//       if (pathname !== "/en") {
//         router.replace("/en");
//       }
//     } else {
//       // ✅ If logged in, redirect to dashboard (except when already there)
//       if (pathname === "/en") {
//         router.replace("/en/dashboard");
//       }
//     }

//     setCheckingAuth(false);
//   }, [router, pathname]);

//   // ✅ Prevent rendering until authentication check is done
//   if (checkingAuth) {
//     return null; // 👈 Prevent flickering or unauthorized content
//   }

//   return <>{children}</>;
// };

// export default AuthWrapper;



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

