"use client";

import React, { useState } from "react";
import { Input, Card, CardBody, Accordion, AccordionItem, Button } from "@heroui/react";
import { motion } from "framer-motion";
import Iconify from "@/components/Iconify";
import Header from "@/layout/Header";

// داده‌های نمونه برای دسته‌بندی‌ها
const categories = [
    {
        id: "account",
        title: "حساب کاربری و احراز هویت",
        icon: "solar:user-id-bold-duotone",
        desc: "راهنمای ثبت‌نام، بازیابی رمز عبور و مراحل احراز هویت",
    },
    {
        id: "trade",
        title: "خرید و فروش طلا",
        icon: "mdi:gold",
        desc: "چگونه طلا بخریم یا بفروشیم؟ نحوه محاسبه قیمت‌ها",
    },
    {
        id: "wallet",
        title: "کیف پول و تراکنش‌ها",
        icon: "solar:wallet-money-bold-duotone",
        desc: "واریز و برداشت ریالی، مدیریت موجودی و شبا",
    },
    {
        id: "security",
        title: "امنیت و حریم خصوصی",
        icon: "solar:shield-keyhole-bold-duotone",
        desc: "تایید دو مرحله‌ای، امنیت دارایی‌ها و سشن‌های فعال",
    },
];

// داده‌های نمونه برای سوالات متداول
const faqs = [
    {
        question: "آیا برای خرید طلا باید احراز هویت کنم؟",
        answer: "بله، طبق قوانین پلیس فتا و جهت جلوگیری از پولشویی، برای انجام هرگونه معامله خرید یا فروش و همچنین برداشت وجه، تکمیل احراز هویت (شامل ارسال کارت ملی و ویدیو سلفی) الزامی است.",
    },
    {
        question: "ساعت کاری بازار گلدینو چگونه است؟",
        answer: "بازار گلدینو ۲۴ ساعته و در ۷ روز هفته فعال است. شما می‌توانید در هر ساعت از شبانه‌روز اقدام به خرید یا فروش طلا نمایید و قیمت‌ها به صورت لحظه‌ای به‌روز می‌شوند.",
    },
    {
        question: "چگونه می‌توانم موجودی خود را برداشت کنم؟",
        answer: "از منوی کیف پول، گزینه برداشت وجه را انتخاب کنید. مبلغ مورد نظر را وارد کرده و به شماره شبای تایید شده خود انتقال دهید. واریزها طبق سیکل پایا (۴ صبح و ۱۴ ظهر) انجام می‌شود.",
    },
    {
        question: "آیا طلای خریداری شده فیزیکی است؟",
        answer: "طلای شما در گلدینو به صورت آب‌شده و معادل وزن آن در خزانه‌های امن بانکی نگهداری می‌شود. در حال حاضر امکان تحویل فیزیکی وجود ندارد و پلتفرم بر پایه نوسان‌گیری و سرمایه‌گذاری امن طراحی شده است.",
    },
];

export default function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState("");

    // فیلتر کردن سوالات بر اساس جستجو (ساده)
    const filteredFaqs = faqs.filter(
        (item) =>
            item.question.includes(searchQuery) || item.answer.includes(searchQuery)
    );

    return (
        <div
            dir="rtl"
            className="relative min-h-screen w-full bg-black font-sans text-foreground selection:bg-amber-500/30 overflow-hidden"
        >
            {/* --- پس‌زمینه مشترک --- */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black pointer-events-none" />
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            {/* نورهای پس‌زمینه مختص صفحه راهنما (سبز/طلایی برای حس آرامش و آموزش) */}
            <div className="fixed top-[-10%] right-[20%] h-[500px] w-[500px] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

            <Header />

            <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
                {/* --- بخش جستجو و هدر --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 space-y-6"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-amber-400 backdrop-blur-sm">
                        <Iconify icon="solar:info-circle-bold" />
                        مرکز آموزش و راهنما
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        چطور می‌توانیم <span className="text-amber-500">راهنمایی‌تان</span> کنیم؟
                    </h1>
                    <p className="text-zinc-400 max-w-xl mx-auto text-lg">
                        پاسخ سوالات متداول و آموزش‌های گام‌به‌گام استفاده از گلدینو
                    </p>

                    <div className="max-w-xl mx-auto mt-8">
                        <Input
                            size="lg"
                            placeholder="جستجو در مقالات (مثلا: احراز هویت)"
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            endContent={
                                <div className="left-4 absolute">
                                    <Iconify
                                        icon="gala:search"
                                        className="text-2xl text-zinc-500 scale-x-[-1]"
                                    />
                                </div>
                            }
                            classNames={{
                                label: " text-zinc-400 text-xs right-0 origin-right rtl:right-4 rtl:left-auto",
                                input: "text-lg text-white font-mono placeholder:text-zinc-700 px-8 py-3 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 transition-all",
                                inputWrapper: "p-0 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 h-14",
                                mainWrapper: "dir-ltr",
                            }}
                        />
                    </div>
                </motion.div>

                {/* --- شبکه دسته‌بندی‌ها (اگر جستجو خالی باشد نمایش داده می‌شود) --- */}
                {searchQuery === "" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
                    >
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <Card
                                    isPressable
                                    className="h-full border border-white/5 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-amber-500/30 transition-all group backdrop-blur-sm"
                                >
                                    <CardBody className="p-6 text-center items-center justify-center gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 shadow-lg">
                                            <Iconify icon={cat.icon} className="text-3xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                                                {cat.title}
                                            </h3>
                                            <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400">
                                                {cat.desc}
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* --- بخش سوالات متداول --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-amber-500 rounded-full" />
                        <h2 className="text-2xl font-bold text-white">
                            {searchQuery ? "نتایج جستجو" : "سوالات پرتکرار"}
                        </h2>
                    </div>

                    <Card className="border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
                        <CardBody className="p-2 sm:p-4">
                            {filteredFaqs.length > 0 ? (
                                <Accordion
                                    selectionMode="multiple"
                                    variant="light"
                                    itemClasses={{
                                        base: "group py-2 border-b border-white/5 last:border-none",
                                        title: "text-zinc-200 text-sm sm:text-base font-medium group-hover:text-amber-400 transition-colors",
                                        trigger: "px-2 data-[hover=true]:bg-zinc-900/50 rounded-lg",
                                        indicator: "text-zinc-500 group-hover:text-amber-500",
                                        content: "text-sm text-zinc-400 leading-7 px-4 pb-4",
                                    }}
                                >
                                    {filteredFaqs.map((faq, idx) => (
                                        <AccordionItem
                                            key={idx}
                                            aria-label={faq.question}
                                            title={faq.question}
                                            startContent={
                                                <Iconify
                                                    icon="solar:question-circle-linear"
                                                    className="text-xl text-zinc-600 group-hover:text-amber-500 transition-colors"
                                                />
                                            }
                                        >
                                            {faq.answer}
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                <div className="py-12 text-center text-zinc-500">
                                    <Iconify icon="solar:confounded-square-linear" className="text-4xl mx-auto mb-2 opacity-50" />
                                    <p>متاسفانه نتیجه‌ای یافت نشد.</p>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </motion.div>

                {/* --- فوتر راهنما: لینک به پشتیبانی --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-zinc-400 mb-4">پاسخ خود را پیدا نکردید؟</p>
                    <Button
                        as="a"
                        href="/support"
                        className="bg-zinc-800 text-white border border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-bold transition-all shadow-lg"
                        size="lg"
                        startContent={<Iconify icon="solar:headset-bold" />}
                    >
                        تماس با پشتیبانی
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}