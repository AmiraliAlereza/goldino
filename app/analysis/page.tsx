"use client";

import React, { useState } from "react";
import { Card, CardBody, Button, Tabs, Tab, Chip, Progress, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import Iconify from "@/components/Iconify";
import Header from "@/layout/Header";

// داده‌های نمایشی برای نمودار (شبیه‌سازی)
const chartTimeframes = [
  { id: "1h", label: "۱ ساعت" },
  { id: "24h", label: "۲۴ ساعت" },
  { id: "7d", label: "۷ روز" },
  { id: "1m", label: "۱ ماه" },
  { id: "1y", label: "۱ سال" },
];

// اخبار نمونه بازار
const marketNews = [
  {
    id: 1,
    source: "خبرگزاری طلا",
    time: "۱۰ دقیقه پیش",
    title: "افزایش تقاضای جهانی طلا در پی نوسانات دلار",
    sentiment: "positive", // positive, negative, neutral
  },
  {
    id: 2,
    source: "تحلیل‌گر اقتصادی",
    time: "۱ ساعت پیش",
    title: "احتمال اصلاح قیمت طلا در کانال ۳.۴ میلیون تومان",
    sentiment: "neutral",
  },
  {
    id: 3,
    source: "بانک مرکزی",
    time: "۳ ساعت پیش",
    title: "عرضه سکه‌های جدید در مرکز مبادله",
    sentiment: "negative",
  },
];

// کامپوننت ساده نمودار SVG (برای نمایش بدون کتابخانه اضافی)
const SimpleChart = ({ color = "#f59e0b" }: { color?: string }) => {
  return (
    <div className="relative h-64 w-full overflow-hidden">
      {/* گرادینت زیر نمودار */}
      <svg
        viewBox="0 0 100 40"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,35 C10,32 15,36 25,25 C35,14 40,18 50,22 C60,26 65,15 75,10 C85,5 90,12 100,2 V40 H0 Z"
          fill="url(#chartGradient)"
        />
        <path
          d="M0,35 C10,32 15,36 25,25 C35,14 40,18 50,22 C60,26 65,15 75,10 C85,5 90,12 100,2"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* خطوط راهنما */}
      <div className="absolute inset-0 flex flex-col justify-between border-t border-b border-white/5 py-2 text-[10px] text-zinc-600 font-mono dir-ltr">
        <span className="px-2">3,500,000</span>
        <span className="px-2">3,450,000</span>
        <span className="px-2">3,400,000</span>
        <span className="px-2">3,350,000</span>
      </div>
    </div>
  );
};

export default function MarketAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  return (
    <div
      dir="rtl"
      className="relative min-h-screen w-full bg-black font-sans text-foreground selection:bg-amber-500/30 overflow-hidden"
    >
      {/* --- Background Effects --- */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black pointer-events-none" />
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* نور آبی برای حس تکنولوژی و تحلیل */}
      <div className="fixed top-[-10%] left-[10%] h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      <Header />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8">
        
        {/* هدر صفحه */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <Iconify icon="solar:chart-2-bold-duotone" className="text-amber-500" />
              تحلیل بازار طلا
            </h1>
            <p className="text-zinc-400 text-sm mt-1">بررسی روند قیمت‌ها و اخبار لحظه‌ای</p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/5 rounded-xl p-2 backdrop-blur-md">
            <span className="text-xs text-zinc-500 px-2">وضعیت بازار:</span>
            <Chip color="success" variant="flat" size="sm" classNames={{ content: "font-bold text-warning-500" }}>
              باز ●
            </Chip>
            <span className="text-xs font-mono text-zinc-400 border-r border-zinc-700 pr-3 mr-1 dir-ltr">
              14:02:45
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- ستون اصلی (چپ/بالا): نمودار قیمت --- */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="lg:col-span-8 space-y-6"
          >
            {/* کارت قیمت اصلی */}
            <Card className="border border-white/10 bg-zinc-950/70 backdrop-blur-xl shadow-2xl">
              <CardBody className="p-0">
                {/* هدر کارت قیمت */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 p-6">
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">طلای ۱۸ عیار (آب‌شده)</div>
                    <div className="flex items-end gap-3">
                      <h2 className="text-4xl font-bold text-white font-mono tracking-tighter dir-ltr">
                        3,452,100
                      </h2>
                      <span className="text-zinc-500 text-lg mb-1">تومان</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <Chip
                        startContent={<Iconify icon="solar:graph-up-bold" />}
                        className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-1"
                        size="lg"
                        variant="flat"
                      >
                        <span className="dir-ltr font-mono font-bold">+1.45%</span>
                      </Chip>
                      <span className="text-xs text-emerald-400 dir-ltr font-mono">+45,000 Toman</span>
                  </div>
                </div>

                {/* تب‌های تایم‌فریم */}
                <div className="px-6 pt-6">
                  <Tabs 
                    aria-label="Timeframes" 
                    color="warning" 
                    variant="underlined"
                    selectedKey={selectedTimeframe}
                    onSelectionChange={(key) => setSelectedTimeframe(key.toString())}
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-white/5",
                        cursor: "w-full bg-amber-500",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-amber-500 text-zinc-500 font-mono"
                    }}
                  >
                    {chartTimeframes.map((tf) => (
                      <Tab key={tf.id} title={tf.label} />
                    ))}
                  </Tabs>
                </div>

                {/* ناحیه نمودار */}
                <div className="p-6">
                    <SimpleChart />
                </div>
                
                {/* آمار خلاصه پایین نمودار */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-zinc-900/30 p-6 border-t border-white/5">
                   {[
                     { label: "پایین‌ترین (۲۴س)", value: "3,410,000", color: "text-rose-400" },
                     { label: "بالاترین (۲۴س)", value: "3,480,000", color: "text-emerald-400" },
                     { label: "حجم معاملات", value: "125 Kg", color: "text-white" },
                     { label: "حباب سکه", value: "1.2%", color: "text-amber-400" },
                   ].map((stat, idx) => (
                     <div key={idx} className="text-center sm:text-right">
                       <div className="text-[10px] text-zinc-500 mb-1">{stat.label}</div>
                       <div className={`font-mono font-bold dir-ltr ${stat.color}`}>{stat.value}</div>
                     </div>
                   ))}
                </div>
              </CardBody>
            </Card>

            {/* بخش اندیکاتورهای تکنیکال (ساده شده) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-white/10 bg-zinc-900/40 backdrop-blur-md">
                    <CardBody className="p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white text-sm">قدرت خریدار / فروشنده</h3>
                            <Iconify icon="solar:pie-chart-2-linear" className="text-zinc-500" />
                        </div>
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                            <span>خریداران (۶۲٪)</span>
                            <span>فروشندگان (۳۸٪)</span>
                        </div>
                        <Progress 
                          size="md" 
                          value={62} 
                          color="success" 
                          classNames={{
                            track: "bg-rose-500/20",
                            indicator: "bg-gradient-to-r from-emerald-600 to-emerald-400",
                          }}
                        />
                        <p className="text-xs text-emerald-400 mt-3 text-center">
                            فشار خرید در بازار مشاهده می‌شود
                        </p>
                    </CardBody>
                </Card>

                <Card className="border border-white/10 bg-zinc-900/40 backdrop-blur-md">
                    <CardBody className="p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white text-sm">تحلیل تکنیکال (RSI)</h3>
                            <Iconify icon="solar:speedometer-linear" className="text-zinc-500" />
                        </div>
                        <div className="relative pt-2">
                             {/* یک گیج ساده با CSS */}
                             <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-rose-500 rounded-full opacity-50 mb-2"></div>
                             <div className="absolute top-0 left-[65%] -translate-x-1/2 flex flex-col items-center">
                                <Iconify icon="solar:map-arrow-down-bold" className="text-white text-lg translate-y-1" />
                             </div>
                             <div className="flex justify-between text-[10px] text-zinc-500 mt-2 font-mono">
                                <span>0</span>
                                <span>50</span>
                                <span>100</span>
                             </div>
                             <div className="text-center mt-1">
                                <span className="text-xl font-bold text-amber-400 font-mono">65.4</span>
                                <span className="text-xs text-zinc-400 block">منطقه اشباع خرید</span>
                             </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
          </motion.div>

          {/* --- ستون کناری (راست/پایین): اخبار و سیگنال --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* کارت پیشنهاد هوشمند */}
            <Card className="bg-gradient-to-br from-amber-600 to-amber-800 border-none shadow-lg shadow-amber-900/20">
                <CardBody className="p-6 text-center">
                    <div className="mb-3 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm text-white">
                        <Iconify icon="solar:magic-stick-3-bold-duotone" className="text-2xl" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">سیگنال هوش مصنوعی</h3>
                    <p className="text-amber-100 text-xs mb-4 px-4 leading-relaxed">
                        با توجه به شکست مقاومت ۳.۴۵۰، روند صعودی تا ۳.۴۸۰ پیش‌بینی می‌شود.
                    </p>
                    <Button className="bg-white text-amber-900 font-bold w-full" size="md">
                        خرید فوری
                    </Button>
                </CardBody>
            </Card>

            {/* لیست اخبار */}
            <Card className="border border-white/10 bg-zinc-950/60 backdrop-blur-md">
                <CardBody className="p-5">
                    <h3 className="font-bold text-white text-sm mb-5 flex items-center gap-2">
                        <Iconify icon="solar:newspaper-bold" className="text-zinc-500" />
                        آخرین اخبار بازار
                    </h3>
                    
                    <div className="space-y-4">
                        {marketNews.map((news) => (
                            <div key={news.id} className="group cursor-pointer">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                                            <span className="text-amber-500/80">{news.source}</span>
                                            <span>•</span>
                                            <span>{news.time}</span>
                                        </div>
                                        <h4 className="text-xs sm:text-sm text-zinc-300 group-hover:text-white transition-colors leading-relaxed line-clamp-2">
                                            {news.title}
                                        </h4>
                                    </div>
                                    <div className={`mt-1 min-w-[6px] h-6 rounded-full ${
                                        news.sentiment === 'positive' ? 'bg-emerald-500' : 
                                        news.sentiment === 'negative' ? 'bg-rose-500' : 'bg-zinc-600'
                                    }`} />
                                </div>
                                <div className="h-[1px] bg-white/5 w-full mt-4 group-last:hidden" />
                            </div>
                        ))}
                    </div>

                    <Button variant="light" size="sm" className="w-full mt-4 text-zinc-400 hover:text-white">
                        مشاهده همه اخبار
                    </Button>
                </CardBody>
            </Card>

            {/* ابزار محاسبه سریع */}
            <Card className="border border-white/10 bg-zinc-900/30 backdrop-blur-md">
                <CardBody className="p-5 space-y-3">
                     <h3 className="font-bold text-white text-sm mb-2">ماشین حساب حباب</h3>
                     <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-white/5 pb-2">
                        <span>قیمت فعلی:</span>
                        <span className="text-white font-mono">34,521,000 Rials</span>
                     </div>
                     <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-white/5 pb-2">
                        <span>ارزش ذاتی:</span>
                        <span className="text-white font-mono">34,100,000 Rials</span>
                     </div>
                     <div className="flex justify-between items-center text-sm font-bold pt-1">
                        <span className="text-zinc-300">مقدار حباب:</span>
                        <span className="text-rose-400 font-mono dir-ltr">+ 421,000 (1.2%)</span>
                     </div>
                </CardBody>
            </Card>

          </motion.div>
        </div>
      </div>
    </div>
  );
}