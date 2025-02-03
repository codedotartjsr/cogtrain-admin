import "../assets/scss/globals.scss";
import "../assets/scss/theme.scss";
import { Inter } from "next/font/google";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import DirectionProvider from "@/provider/direction.provider";
import AuthWrapper from "@/provider/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Cogtrain - Dashboard",
    template: `Cogtrain - Dashboard`,
  },
  description: "Your site description goes here.",
};

export default function RootLayout({ children, params: { lang } }) {
  return (
    <html lang={lang}>
      <body>
            <Providers>
              <AuthWrapper>
                <DirectionProvider lang={lang}>{children}</DirectionProvider>
              </AuthWrapper>
            </Providers>
      </body>
    </html>
  );
}
