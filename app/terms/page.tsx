"use client";

import React from "react";
import { Card, CardBody, Button, Accordion, AccordionItem, Link } from "@heroui/react";
import { motion } from "framer-motion";
import Iconify from "@/components/Iconify";
import Header from "@/layout/Header";

export default function TermsAndConditions() {
    const termsData = [
        {
            id: "1",
            title: "شرایط عمومی و حساب کاربری",
            icon: "solar:user-circle-bold",
            content:
                "کاربران موظف هستند اطلاعات هویتی واقعی خود را وارد نمایند. هر کاربر تنها مجاز به ساخت یک حساب کاربری است. مسئولیت حفظ امنیت رمز عبور و کدهای تایید بر عهده کاربر می‌باشد و گلدینو مسئولیتی در قبال دسترسی‌های غیرمجاز ناشی از بی احتیاطی کاربر ندارد.",
        },
        {
            id: "2",
            title: "قوانین خرید و فروش طلا",
            icon: "mdi:gold",
            content:
                "قیمت‌های نمایش داده شده در سایت بر اساس نرخ لحظه‌ای بازار و اتحادیه طلا محاسبه می‌شود. پس از تایید نهایی سفارش خرید یا فروش، امکان لغو آن وجود ندارد چرا که معامله به صورت آنی در بازار انجام می‌شود. کارمزد خدمات صفر بوده اما ممکن است در آینده طبق ابلاغیه‌های جدید تغییر کند.",
        },
        {
            id: "3",
            title: "کیف پول و واریز/برداشت",
            icon: "solar:wallet-money-bold",
            content:
                "واریز وجه تنها از کارت‌های بانکی به نام صاحب حساب کاربری امکان‌پذیر است. درخواست‌های برداشت وجه (تسویه ریالی) در روزهای کاری طبق سیکل پایا (۱۴:۰۰ و ۰۴:۰۰ بامداد) پردازش می‌شوند. حداقل مبلغ واریز ۱۰۰ هزار تومان و حداقل برداشت ۵۰ هزار تومان است.",
        },
        {
            id: "4",
            title: "احراز هویت (KYC)",
            icon: "solar:shield-check-bold",
            content:
                "برای انجام معاملات بالای ۵۰ میلیون تومان و یا برداشت وجه، تکمیل مراحل احراز هویت (ارسال تصویر کارت ملی و ویدیو سلفی) الزامی است. این اقدام در راستای قوانین مبارزه با پولشویی و دستور پلیس فتا انجام می‌شود.",
        },
        {
            id: "5",
            title: "حریم خصوصی",
            icon: "solar:lock-password-bold",
            content:
                "گلدینو متعهد می‌شود اطلاعات شخصی و مالی کاربران را محرمانه تلقی کرده و تنها در صورت دستور کتبی مقام قضایی در اختیار مراجع ذی‌صلاح قرار دهد.",
        },
    ];

    return (
        <div dir="rtl" className="relative min-h-screen w-full bg-black font-sans text-foreground selection:bg-amber-500/30 overflow-hidden">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black pointer-events-none" />
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="fixed top-[-20%] left-[20%] h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />
            <Header />

            <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 text-center"
                >
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 shadow-lg">
                        <Iconify icon="solar:document-text-bold-duotone" className="text-4xl text-amber-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white md:text-4xl">قوانین و مقررات</h1>
                    <p className="mt-3 text-zinc-400">لطفا پیش از فعالیت در گلدینو، قوانین زیر را با دقت مطالعه فرمایید.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
                        <CardBody className="p-6 sm:p-8">
                            <Accordion
                                selectionMode="multiple"
                                variant="splitted"
                                itemClasses={{
                                    base: "group mb-3",
                                    title: "text-white text-sm sm:text-base font-medium",
                                    trigger: "px-4 py-3 rounded-xl bg-zinc-900/50 data-[hover=true]:bg-zinc-900 transition-colors border border-transparent data-[open=true]:border-amber-500/30",
                                    indicator: "text-zinc-400 data-[open=true]:text-amber-500",
                                    content: "text-sm text-zinc-400 leading-7 pb-4 px-2",
                                }}
                            >
                                {termsData.map((item) => (
                                    <AccordionItem
                                        key={item.id}
                                        aria-label={item.title}
                                        startContent={
                                            <Iconify icon={item.icon} className="text-xl text-amber-500/80 ml-2" />
                                        }
                                        title={item.title}
                                    >
                                        {item.content}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex justify-center"
                >
                    <Button
                        as={Link}
                        href="/"
                        variant="light"
                        className="text-zinc-400 hover:text-white"
                        startContent={<Iconify icon="solar:arrow-right-linear" />}
                    >
                        بازگشت به خانه
                    </Button>
                </motion.div>

                <div className="mt-12 text-center text-[10px] text-zinc-600">
                    آخرین بروزرسانی: اردیبهشت ۱۴۰۳
                </div>
            </div>
        </div>
    );
}