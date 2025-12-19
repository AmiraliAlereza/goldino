"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Button,
    Chip,
    Input,
    Tabs,
    Tab,
    Tooltip,
    Card,
    CardBody
} from "@heroui/react";
import { motion } from "framer-motion";
import Iconify from "@/components/Iconify";
import Header from "@/layout/Header";

// داده‌های نمونه قیمت‌ها
const initialData = [
    {
        id: "gold-18",
        name: "طلای ۱۸ عیار",
        symbol: "GOLD18",
        price: "3,452,000",
        change: "+1.24%",
        amountChange: "+42,000",
        high: "3,460,000",
        low: "3,410,000",
        status: "up",
        category: "gold",
        icon: "mdi:gold",
        color: "warning" // for avatar/icon bg
    },
    {
        id: "gold-24",
        name: "طلای ۲۴ عیار",
        symbol: "GOLD24",
        price: "4,590,000",
        change: "+1.10%",
        amountChange: "+51,000",
        high: "4,600,000",
        low: "4,550,000",
        status: "up",
        category: "gold",
        icon: "mdi:gold",
        color: "warning"
    },
    {
        id: "coin-emami",
        name: "سکه امامی",
        symbol: "EMAMI",
        price: "42,100,000",
        change: "-0.5%",
        amountChange: "-210,000",
        high: "42,500,000",
        low: "41,900,000",
        status: "down",
        category: "coin",
        icon: "ph:coin-duotone",
        color: "secondary"
    },
    {
        id: "coin-bahar",
        name: "سکه بهار آزادی",
        symbol: "BAHAR",
        price: "39,800,000",
        change: "+0.2%",
        amountChange: "+80,000",
        high: "39,950,000",
        low: "39,500,000",
        status: "up",
        category: "coin",
        icon: "ph:coins-duotone",
        color: "secondary"
    },
    {
        id: "coin-half",
        name: "نیم سکه",
        symbol: "HALF",
        price: "23,400,000",
        change: "0.0%",
        amountChange: "0",
        high: "23,400,000",
        low: "23,400,000",
        status: "neutral",
        category: "coin",
        icon: "solar:pie-chart-2-bold",
        color: "secondary"
    },
    {
        id: "coin-quarter",
        name: "ربع سکه",
        symbol: "QUARTER",
        price: "15,200,000",
        change: "-1.5%",
        amountChange: "-250,000",
        high: "15,500,000",
        low: "15,100,000",
        status: "down",
        category: "coin",
        icon: "solar:pie-chart-bold",
        color: "secondary"
    },
    {
        id: "usd",
        name: "دلار آمریکا (تتر)",
        symbol: "USDT",
        price: "61,200",
        change: "+0.8%",
        amountChange: "+450",
        high: "61,500",
        low: "60,800",
        status: "up",
        category: "currency",
        icon: "solar:dollar-minimalistic-bold",
        color: "success"
    },
];

// ستون‌های جدول
const columns = [
    { name: "نام و نماد", uid: "name" },
    { name: "آخرین قیمت (تومان)", uid: "price" },
    { name: "تغییرات (۲۴س)", uid: "change" },
    { name: "نمودار روند", uid: "chart" },
    { name: "عملیات", uid: "actions" },
];

// کامپوننت نمودار کوچک (Sparkline)
const Sparkline = ({ status }: { status: string }) => {
    const color = status === "up" ? "#10b981" : status === "down" ? "#f43f5e" : "#71717a";
    const pathUp = "M0 20 L10 18 L20 22 L30 15 L40 12 L50 16 L60 8 L70 10 L80 5 L90 2";
    const pathDown = "M0 5 L10 8 L20 4 L30 10 L40 15 L50 12 L60 18 L70 16 L80 22 L90 25";
    const pathNeutral = "M0 15 L10 15 L20 12 L30 18 L40 15 L50 15 L60 12 L70 18 L80 15 L90 15";
    const d = status === "up" ? pathUp : status === "down" ? pathDown : pathNeutral;

    return (
        <svg width="90" height="30" viewBox="0 0 90 30" fill="none">
            <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d={`${d} L90 30 L0 30 Z`} fill={color} fillOpacity="0.1" stroke="none" />
        </svg>
    );
};

export default function LivePrices() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString("fa-IR"));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // فیلتر دیتا
    const filteredData = React.useMemo(() => {
        return initialData.filter((item) => {
            const matchesCategory = filter === "all" || item.category === filter;
            const matchesSearch =
                item.name.includes(search) || item.symbol.includes(search.toUpperCase());
            return matchesCategory && matchesSearch;
        });
    }, [filter, search]);

    // تابع رندر کردن سلول‌های جدول
    const renderCell = useCallback((item: typeof initialData[0], columnKey: React.Key) => {
        switch (columnKey) {
            case "name":
                return (
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl 
              ${item.color === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                                    item.color === 'secondary' ? 'bg-indigo-500/10 text-indigo-400' :
                                        'bg-emerald-500/10 text-emerald-500'}`}
                        >
                            <Iconify icon={item.icon} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">{item.name}</span>
                            <span className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.symbol}</span>
                        </div>
                    </div>
                );
            case "price":
                return (
                    <div className="flex flex-col items-start justify-center">
                        <span className="font-mono text-base font-bold text-white dir-ltr">
                            {item.price}
                        </span>
                        <span className="text-[10px] text-zinc-500">سقف: {item.high}</span>
                    </div>
                );
            case "change":
                return (
                    <div className="flex flex-col items-start md:items-center justify-center">
                        <span
                            className={`font-mono text-sm font-bold dir-ltr ${item.status === "up" ? "text-emerald-400" :
                                item.status === "down" ? "text-rose-400" : "text-zinc-400"
                                }`}
                        >
                            {item.change}
                        </span>
                        <span
                            className={`font-mono text-[10px] dir-ltr ${item.status === "up" ? "text-emerald-500/60" :
                                item.status === "down" ? "text-rose-500/60" : "text-zinc-500/60"
                                }`}
                        >
                            ({item.amountChange})
                        </span>
                    </div>
                );
            case "chart":
                return (
                    <div className="flex justify-center opacity-70 hover:opacity-100 transition-opacity">
                        <Sparkline status={item.status} />
                    </div>
                );
            case "actions":
                return (
                    <div className="flex items-center justify-end gap-2">
                        <Tooltip content="مشاهده جزئیات">
                            <Button isIconOnly size="sm" variant="light" className="text-zinc-400 hover:text-white">
                                <Iconify icon="solar:chart-2-linear" className="text-lg" />
                            </Button>
                        </Tooltip>
                        <Button size="sm" className="bg-zinc-800 text-white font-medium hover:bg-zinc-700 min-w-[60px]">
                            فروش
                        </Button>
                        <Button size="sm" className="bg-amber-500 text-black font-bold hover:bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)] min-w-[60px]">
                            خرید
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    }, []);

    return (
        <div
            dir="rtl"
            className="relative min-h-screen w-full bg-black font-sans text-foreground selection:bg-amber-500/30 overflow-hidden"
        >
            {/* --- پس‌زمینه --- */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black pointer-events-none" />
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="fixed top-[-10%] right-[30%] h-[500px] w-[500px] rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />

            <Header />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-10">

                {/* --- هدر صفحه: شاخص‌های کلیدی --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </div>
                                تابلوی قیمت لحظه‌ای
                            </h1>
                            <p className="text-zinc-400 text-sm">نرخ‌ها بر اساس میانگین معاملات بازار تهران به‌روز می‌شوند.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2">
                            <Iconify icon="solar:clock-circle-linear" className="text-zinc-500" />
                            <span className="text-zinc-300 text-sm">آخرین بروزرسانی:</span>
                            <span className="font-mono font-bold text-amber-500 dir-ltr min-w-[80px] text-center">{currentTime}</span>
                        </div>
                    </div>

                    {/* کارت‌های شاخص */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="bg-zinc-900/40 border border-white/5 backdrop-blur-md">
                            <CardBody className="flex flex-row items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <Iconify icon="streamline-freehand:wealth-gold-bars" className="text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-400">انس جهانی طلا</div>
                                        <div className="font-mono font-bold text-white text-lg dir-ltr">$ 2,345.50</div>
                                    </div>
                                </div>
                                <Chip size="sm" color="success" variant="flat" classNames={{ content: "font-mono ltr text-blue-500" }}>+0.5%</Chip>
                            </CardBody>
                        </Card>
                        <Card className="bg-zinc-900/40 border border-white/5 backdrop-blur-md">
                            <CardBody className="flex flex-row items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        <Iconify icon="solar:dollar-minimalistic-bold" className="text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-400">نرخ دلار حواله</div>
                                        <div className="font-mono font-bold text-white text-lg dir-ltr">61,200 T</div>
                                    </div>
                                </div>
                                <Chip size="sm" color="danger" variant="flat" classNames={{ content: "font-mono ltr text-green-500" }}>-0.2%</Chip>
                            </CardBody>
                        </Card>
                    </div>
                </motion.div>

                {/* --- ابزارهای فیلتر و جستجو --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 sticky top-24 z-20 bg-black/80 p-2 rounded-2xl border border-white/5 backdrop-blur-lg shadow-2xl">
                    <Tabs
                        aria-label="Filter"
                        radius="full"
                        color="warning"
                        variant="light"
                        selectedKey={filter}
                        onSelectionChange={(k) => setFilter(k.toString())}
                        classNames={{
                            tabList: "gap-1",
                            cursor: "w-full bg-amber-500/20 border border-amber-500/50 rounded-lg",
                            tab: "h-10 px-4 min-w-20",
                            tabContent: "group-data-[selected=true]:text-amber-500 text-zinc-400"
                        }}
                    >
                        <Tab key="all" title="همه موارد" />
                        <Tab key="gold" title="طلا" />
                        <Tab key="coin" title="سکه" />
                        <Tab key="currency" title="ارز" />
                    </Tabs>

                    <Input
                        placeholder="جستجو نماد یا نام..."
                        value={search}
                        onValueChange={setSearch}
                        endContent={
                            <div className="left-4 absolute">

                                <Iconify icon="gala:search" className="text-zinc-500 scale-x-[-1]" />
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

                {/* --- جدول لیست قیمت‌ها (جایگزین شده با Table Component) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pb-20"
                >
                    <Table
                        aria-label="Live Market Prices Table"
                        selectionMode="none"
                        classNames={{
                            wrapper: "bg-zinc-900/30 border border-white/5 backdrop-blur-md p-0 shadow-none overflow-x-auto",
                            th: "bg-zinc-900/80 text-zinc-400 text-xs py-4 h-12",
                            td: "text-white py-4 border-b border-white/5 group-last:border-none",
                            table: "min-w-[600px] md:min-w-full", // For horizontal scroll on mobile
                            tr: "hover:bg-zinc-800/40 transition-colors cursor-default group data-[hover=true]:bg-zinc-800/40"
                        }}
                        isStriped={false}
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn
                                    key={column.uid}
                                    align={column.uid === "actions" ? "end" : column.uid === "change" || column.uid === "chart" ? "center" : "start"}
                                    className={column.uid === 'chart' ? "hidden md:table-cell" : ""}
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={filteredData}
                            emptyContent={<div className="text-zinc-500 py-10">موردی با این مشخصات یافت نشد.</div>}
                        >
                            {(item) => (
                                <TableRow key={item.id} className="border-b border-white/5 last:border-none">
                                    {(columnKey) => (
                                        <TableCell className={columnKey === 'chart' ? "hidden md:table-cell" : ""}>
                                            {renderCell(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </motion.div>

            </div>
        </div>
    );
}