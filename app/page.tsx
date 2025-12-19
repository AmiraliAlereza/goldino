"use client";

import React, { useState } from "react";
import { Button, Card, CardBody, Input, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Iconify from "@/components/Iconify";
import Header from "@/layout/Header";

export default function Home() {
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");

  return (
    <div dir="rtl" className="relative min-h-screen w-full bg-black font-sans text-foreground selection:bg-amber-500/30">

      {/* --- Background Effects --- */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="fixed top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none" />

      {/* --- Navbar --- */}

    <Header/>
      {/* --- Hero Section --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Chip variant="flat" classNames={{ base: "bg-amber-500/10 border border-amber-500/20", content: "text-amber-400 font-bold px-2" }}>
            ✨ جدیدترین پلتفرم معاملات طلا
          </Chip>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            آینده سرمایه‌گذاری <br />
            در <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">صندوق طلای امن</span>
          </h1>

          <p className="max-w-lg text-lg text-zinc-400 leading-relaxed">
            بدون اجرت و مالیات، طلای آب‌شده بخرید. امنیت دارایی شما در خزانه‌های بانکی تضمین شده است. نقدشوندگی آنی در هر ساعت از شبانه‌روز.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-white text-black font-bold hover:bg-zinc-200 px-8 h-14 text-base">
              شروع سرمایه‌گذاری
            </Button>
            <Button size="lg" variant="bordered" className="border-zinc-700 text-white hover:border-amber-500 hover:text-amber-500 h-14 text-base">
              <Iconify icon="solar:play-circle-linear" className="text-xl" />
              آموزش ویدیویی
            </Button>
          </div>

          {/* Trust Stats */}
          <div className="flex items-center gap-6 pt-8 border-t border-white/5">
            <div>
              <div className="text-2xl font-bold text-white font-mono dir-ltr">+50K</div>
              <div className="text-xs text-zinc-500">کاربر فعال</div>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div>
              <div className="text-2xl font-bold text-white font-mono dir-ltr">24/7</div>
              <div className="text-xs text-zinc-500">پشتیبانی آنلاین</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Quick Trade Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glow effect behind card */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-700 opacity-20 blur-xl" />

          <Card className="border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xl w-full max-w-md mx-auto">
            <CardBody className="p-6 sm:p-8 space-y-6">

              {/* Card Header: Live Price */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block mb-1">قیمت لحظه‌ای (۱ گرم ۱۸ عیار)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white font-mono tracking-wider dir-ltr">3,450,000</span>
                    <span className="text-xs text-zinc-500">تومان</span>
                  </div>
                </div>
                <Chip color="warning" classNames={{content:"text-amber-400"}} variant="flat" size="sm" startContent={<Iconify className="text-amber-400" icon="solar:graph-up-bold" />}>
                  +1.25%
                </Chip>
              </div>

              {/* Tabs (Logic Fixed) */}
              <div className="grid grid-cols-2 gap-1 bg-zinc-900/50 p-1 rounded-xl">
                <button
                  onClick={() => setTradeMode("buy")}
                  className={`py-2 text-sm font-bold rounded-lg transition-all ${tradeMode === "buy"
                      ? "bg-zinc-800 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  خرید طلا
                </button>
                <button
                  onClick={() => setTradeMode("sell")}
                  className={`py-2 text-sm font-bold rounded-lg transition-all ${tradeMode === "sell"
                      ? "bg-zinc-800 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  فروش طلا
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  type="number"
                  label={tradeMode === "buy" ? "مبلغ پرداختی (تومان)" : "مبلغ دریافتی (تومان)"}
                  labelPlacement="outside"
                  endContent={<Iconify icon="solar:wallet-linear" className="text-zinc-500" />}
                  classNames={{
                    label: "text-zinc-400 text-xs",
                    input: "text-white font-mono",
                    inputWrapper: "bg-zinc-900 border-zinc-800 hover:border-amber-500/50 focus-within:!border-amber-500 h-12"
                  }}
                />

                <div className="flex items-center justify-center -my-2 relative z-10">
                  <div className="bg-zinc-800 rounded-full p-1 border border-zinc-700">
                    <Iconify icon="solar:arrow-down-linear" className="text-zinc-400" />
                  </div>
                </div>

                <Input
                  type="number"
                  label={tradeMode === "buy" ? "معادل طلای دریافتی (گرم)" : "مقدار طلا برای فروش (گرم)"}
                  labelPlacement="outside"
                  endContent={<Iconify icon="mdi:gold" className="text-amber-500" />}
                  classNames={{
                    label: "text-zinc-400 text-xs",
                    input: "text-amber-400 font-bold font-mono", 
                    inputWrapper: "bg-zinc-900 border-zinc-800 h-12"
                  }}
                />
              </div>

              <Button
                fullWidth
                size="lg"
                className={`text-black font-bold shadow-lg transition-all ${tradeMode === "buy"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 shadow-amber-500/20"
                    : "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-rose-500/20"
                  }`}
              >
                {tradeMode === "buy" ? "تایید خرید طلا" : "تایید فروش طلا"}
              </Button>

              <div className="text-center text-[10px] text-zinc-600">
                کارمزد معامله: ۰ تومان | تضمین امنیت توسط بانک
              </div>

            </CardBody>
          </Card>
        </motion.div>
      </section>

      {/* --- Features Section --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "امنیت بانکی", icon: "solar:shield-check-bold-duotone", desc: "طلاهای شما در خزانه امن بانک نگهداری می‌شوند و گواهی سپرده صادر می‌گردد." },
            { title: "نقدشوندگی سریع", icon: "solar:card-transfer-bold-duotone", desc: "در هر ساعت از شبانه‌روز موجودی طلای خود را به تومان تبدیل کرده و برداشت کنید." },
            { title: "شفافیت قیمت", icon: "solar:graph-new-bold-duotone", desc: "خرید و فروش دقیقاً بر اساس نرخ لحظه‌ای اتحادیه طلا و بدون حباب قیمتی." },
          ].map((item, index) => (
            <Card key={index} className="border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors backdrop-blur-sm">
              <CardBody className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-amber-500 shadow-inner">
                  <Iconify icon={item.icon} className="text-3xl" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* --- Simple Footer --- */}
      <footer className="border-t border-white/5 bg-black/50 py-8 text-center backdrop-blur-md">
        <p className="text-sm text-zinc-600">
          © 2025 Goldino. تمامی حقوق محفوظ است.
        </p>
      </footer>
    </div>
  );
}