"use client";

import React, { useState } from "react";
import { Card, CardBody, Button, Input, Textarea, Accordion, AccordionItem } from "@heroui/react";
import { motion } from "framer-motion";
import Iconify from "@/components/Iconify";
import Header from "@/layout/Header";
import { getDisplayMobile } from "@/utils/utils";

export default function Support() {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const contactMethods = [
    { title: "تلفن تماس", value: "۰۲۱-۸۸۸۸۴۴۴۴", icon: "solar:phone-calling-bold", action: "tel:02188884444" },
    { title: "پشتیبانی تلگرام", value: "@GoldinoSupport", icon: "logos:telegram", action: "https://t.me/GoldinoSupport" },
    { title: "ایمیل سازمانی", value: "info@goldino.ir", icon: "solar:letter-bold", action: "mailto:info@goldino.ir" },
  ];

  return (
    <div dir="rtl" className="relative min-h-screen w-full bg-black font-sans text-foreground selection:bg-amber-500/30 overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="fixed top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <Header />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">


        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">چطور می‌توانیم <span className="text-amber-500">کمک</span> کنیم؟</h1>
          <p className="text-zinc-400">تیم پشتیبانی گلدینو در ۷ روز هفته و ۲۴ ساعت شبانه‌روز پاسخگوی شماست.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              {contactMethods.map((method, idx) => (
                <a key={idx} href={method.action} className="block group">
                  <Card className="border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all backdrop-blur-md">
                    <CardBody className="flex flex-row items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                        <Iconify icon={method.icon} className="text-2xl" />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">{method.title}</div>
                        <div className="text-lg font-mono font-bold text-white dir-ltr text-right">{method.value}</div>
                      </div>
                      <Iconify icon="solar:arrow-left-linear" className="mr-auto text-zinc-600 group-hover:text-white transition-colors" />
                    </CardBody>
                  </Card>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Iconify icon="solar:question-circle-bold" className="text-amber-500" />
                سوالات پرتکرار
              </h3>
              <Accordion variant="shadow" selectionMode="single" >
                <AccordionItem key="1" aria-label="چگونه احراز هویت کنم؟" title="چگونه احراز هویت کنم؟" classNames={{ title: "text-sm text-zinc-300 flex fullWidth", content: "text-xs text-zinc-400" }}>
                  وارد پنل کاربری شوید، از منوی سمت راست گزینه حساب کاربری و سپس احراز هویت را انتخاب کنید.
                </AccordionItem>
                <AccordionItem key="2" aria-label="کارمزد خرید چقدر است؟" title="کارمزد خرید چقدر است؟" classNames={{ title: "text-sm text-zinc-300", content: "text-xs text-zinc-400" }}>
                  در حال حاضر خرید و فروش طلا در گلدینو بدون کارمزد و بدون اجرت انجام می‌شود.
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <Card className="h-full border border-white/10 bg-zinc-950/70 backdrop-blur-xl shadow-2xl">
              <CardBody className="p-6 sm:p-10">
                <h2 className="text-xl font-bold text-white mb-6">ارسال تیکت پشتیبانی</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      size="lg"
                      label="نام و نام خانوادگی"
                      labelPlacement="outside"
                      classNames={{
                        label: " text-zinc-400 text-xs right-0 origin-right rtl:right-4 rtl:left-auto",
                        input: "text-lg text-white font-mono placeholder:text-zinc-700 px-4 py-3 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 transition-all",
                        inputWrapper: "p-0 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 h-14",
                        mainWrapper: "dir-ltr",
                      }}
                    />
                    <Input
                      size="lg"
                      type="tel"
                      value={getDisplayMobile(mobile)}
                      onValueChange={(e) => setMobile(e)}
                      label="شماره تماس"
                      labelPlacement="outside"
                      dir="ltr"
                      classNames={{
                        label: " text-zinc-400 text-xs right-0 origin-right rtl:right-4 rtl:left-auto",
                        input: "text-lg text-white font-mono placeholder:text-zinc-700 px-4 py-3 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 transition-all",
                        inputWrapper: "p-0 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 h-14",
                        mainWrapper: "dir-ltr",
                      }}
                    />
                  </div>

                  <Input
                    size="lg"
                    label="موضوع پیام"
                    labelPlacement="outside"
                    classNames={{
                      label: " text-zinc-400 text-xs right-0 origin-right rtl:right-4 rtl:left-auto",
                      input: "text-lg text-white font-mono placeholder:text-zinc-700 px-4 py-3 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 transition-all",
                      inputWrapper: "p-0 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 h-14",
                      mainWrapper: "dir-ltr",
                    }}
                  />

                  <Textarea
                    size="lg"
                    label="متن پیام"
                    labelPlacement="outside"
                    placeholder="توضیحات خود را اینجا بنویسید..."
                    minRows={5}
                    classNames={{
                      label: " text-zinc-400 text-xs text-right mb-2 origin-right rtl:right-4 rtl:left-auto",
                      input: "text-lg text-white font-mono placeholder:text-zinc-700 px-4 py-3 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 transition-all",
                      inputWrapper: "p-0 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 h-14",
                      mainWrapper: "dir-ltr",
                    }}
                  />

                  <Button
                    type="submit"
                    isLoading={loading}
                    size="lg"
                    className="w-full h-14 bg-amber-500 text-black text-lg font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all"
                  >
                    ارسال پیام
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}