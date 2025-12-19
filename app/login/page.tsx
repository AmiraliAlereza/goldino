"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Link } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Iconify from "@/components/Iconify";
import MobileEntry from "./MobileEntry";
import OtpVerification from "./OtpVerification";
import { useRouter } from "next/navigation";


export default function Login() {
  const [step, setStep] = useState<1 | 2>(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const triggerShake = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  const handleSendOtp = async () => {
    if (mobile.length < 11 || !mobile.startsWith("09")) {
      triggerShake();
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setStep(2);
    setCountdown(60);
    setOtp("");
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login Success with:", otp);
    router.push("/");
    setIsLoading(false);

  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCountdown(60);
      setIsLoading(false);
    }, 1000);
  };

  const handleEditNumber = () => {
    setStep(1);
    setOtp("");
  };

  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black font-sans text-foreground selection:bg-amber-500/30"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-yellow-500/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: errorShake ? [-10, 10, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.4, x: { duration: 0.4 } }}
        className="relative z-10 w-full max-w-[420px] px-4"
      >
        <Card className="border border-white/10 bg-zinc-950/70 shadow-2xl backdrop-blur-xl overflow-visible">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          <CardBody className="flex flex-col gap-8 p-6 sm:p-8">

            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 to-black ring-1 ring-white/10 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)]"
              >
                <Iconify
                  icon="mdi:gold"
                  className="h-8 w-8 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                />
              </motion.div>

              <h1 className="text-xl font-bold text-white tracking-tight">صندوق طلای امن</h1>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed max-w-[250px]">
                {step === 1 ? (
                  "برای ورود یا ثبت‌نام، شماره موبایل خود را وارد کنید"
                ) : (
                  <>
                    کد تایید ۴ رقمی به شماره{" "}
                    <span className="font-mono text-amber-400 dir-ltr inline-block mx-1 font-bold">
                      {mobile}
                    </span>{" "}
                    ارسال شد
                  </>
                )}
              </p>
            </div>

            <div className="relative min-h-[160px]">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <MobileEntry
                    key="entry"
                    mobile={mobile}
                    setMobile={setMobile}
                    isLoading={isLoading}
                    onSubmit={handleSendOtp}
                  />
                ) : (
                  <OtpVerification
                    key="verify"
                    otp={otp}
                    setOtp={setOtp}
                    isLoading={isLoading}
                    countdown={countdown}
                    onVerify={handleVerifyOtp}
                    onResend={handleResend}
                    onEditNumber={handleEditNumber}
                  />
                )}
              </AnimatePresence>
            </div>

          </CardBody>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-6 opacity-60"
        >
          <Link
            href="/terms"
            className="text-xs text-zinc-500 hover:text-amber-500 transition-colors"
          >
            قوانین و مقررات
          </Link>
          <div className="h-3 w-[1px] bg-zinc-800" />
          <Link
            href="/support"
            className="text-xs text-zinc-500 hover:text-amber-500 transition-colors"
          >
            پشتیبانی
          </Link>
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
      </motion.div>
    </div>
  );
}