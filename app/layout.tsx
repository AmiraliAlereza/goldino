import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google"; 
import "./globals.css";
import Providers from "./Providers";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazir", 
});

export const metadata: Metadata = {
  title: "Goldino | صندوق طلای امن",
  description: "پلتفرم خرید و فروش طلای دیجیتال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl"> 
      <body className={`${vazir.variable} font-sans antialiased bg-black text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}