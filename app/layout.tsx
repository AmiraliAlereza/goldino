import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google"; // 1. ایمپورت فونت
import "./globals.css";

// 2. تنظیم فونت
const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazir", // تعریف یک متغیر CSS برای استفاده در Tailwind
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
      {/* 3. اضافه کردن متغیر فونت به بدنه و کلاس آن */}
      <body className={`${vazir.variable}font- font-sans antialiased bg-black text-foreground`}>
        {children}
      </body>
    </html>
  );
}