// import "../assets/scss/globals.scss";
// import "../assets/scss/theme.scss";
// import { Inter } from "next/font/google";
// import { siteConfig } from "@/config/site";
// import Providers from "@/provider/providers";
// import "simplebar-react/dist/simplebar.min.css";
// import TanstackProvider from "@/provider/providers.client";
// import AuthProvider from "@/provider/auth.provider";
// import "flatpickr/dist/themes/light.css";
// import DirectionProvider from "@/provider/direction.provider";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
// };

// export default function RootLayout({ children, params: { lang } }) {
//   return (
//     <html lang={lang}>
//       <AuthProvider>
//         <TanstackProvider>
//           <Providers>
//             <DirectionProvider lang={lang}>{children}</DirectionProvider>
//           </Providers>
//         </TanstackProvider>
//       </AuthProvider>
//     </html>
//   );
// }





// "use client";

// import "../assets/scss/globals.scss";
// import "../assets/scss/theme.scss";
// import { Inter } from "next/font/google";
// import { siteConfig } from "@/config/site";
// import Providers from "@/provider/providers";
// import "simplebar-react/dist/simplebar.min.css";
// import TanstackProvider from "@/provider/providers.client";
// import AuthProvider from "@/provider/auth.provider";
// import "flatpickr/dist/themes/light.css";
// import DirectionProvider from "@/provider/direction.provider";
// const inter = Inter({ subsets: ["latin"] });

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export const metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
// };

// export default function RootLayout({ children, params: { lang } }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       // Redirect if no token is found
//       // router.push("/auth/login");en/dashboard
//       // router.replace("/en"); // 🔹 Use replace() instead of push()
//       router.push("/en");
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [router]);

//   return (
//     <html lang={lang}>
//       <AuthProvider>
//         <TanstackProvider>
//           <Providers>
//             <>
//               {!isAuthenticated ?
//                 <DirectionProvider lang={lang}>{children}</DirectionProvider>
//                 : null}
//             </>
//           </Providers>
//         </TanstackProvider>
//       </AuthProvider>
//     </html>
//   );
// }



import "../assets/scss/globals.scss";
import "../assets/scss/theme.scss";
import { Inter } from "next/font/google";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/provider/providers.client";
import AuthProvider from "@/provider/auth.provider";
import "flatpickr/dist/themes/light.css";
import DirectionProvider from "@/provider/direction.provider";
import AuthWrapper from "@/provider/AuthWrapper"; // ✅ Import AuthWrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Robokart - LMS",
    // template: `%s - Your Site Name`,
    // template: `%s - Cogtrain`,
    template: `Robokart - LMS`,
  },
  description: "Your site description goes here.",
};

export default function RootLayout({ children, params: { lang } }) {
  return (
    <html lang={lang}>
      <body>
        <AuthProvider>
          <TanstackProvider>
            <Providers>
              <AuthWrapper> {/* ✅ Wrap children inside AuthWrapper */}
                <DirectionProvider lang={lang}>{children}</DirectionProvider>
              </AuthWrapper>
            </Providers>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
