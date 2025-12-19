import React, { useEffect } from "react";
import { Button, InputOtp } from "@heroui/react";
import { motion } from "framer-motion";
import Iconify from "@/components/Iconify";

interface OtpVerificationProps {
  otp: string;
  setOtp: (val: string) => void;
  isLoading: boolean;
  countdown: number;
  onVerify: () => void;
  onResend: () => void;
  onEditNumber: () => void;
}

const OTP_LENGTH = 4;

const OtpVerification = ({
  otp,
  setOtp,
  isLoading,
  countdown,
  onVerify,
  onResend,
  onEditNumber,
}: OtpVerificationProps) => {
  const isComplete = otp.length === OTP_LENGTH;

  useEffect(() => {
    if (isComplete) {
      onVerify();
    }
  }, [isComplete, onVerify]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && isComplete) {
      onVerify();
    }
  };

  return (
    <motion.form
      key="step2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="space-y-7"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full items-center justify-center py-2" dir="ltr">
        <InputOtp
          length={OTP_LENGTH}
          value={otp}
          onValueChange={setOtp}
          isDisabled={isLoading}
          autoFocus
          aria-label="OTP Input"
          classNames={{
            base: "flex flex-row gap-5 items-center justify-center", 
            segment:
              "h-14 w-12 sm:h-16 sm:w-16 text-3xl font-bold border-zinc-800 bg-zinc-900/50 text-white rounded-2xl shadow-inner data-[active=true]:border-amber-500 data-[active=true]:scale-110 data-[active=true]:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-200",
            segmentWrapper: "flex flex-row gap-5",
          }}
        />
      </div>

      <div className="flex items-center justify-between text-xs px-2 text-zinc-400">
        <button
          type="button"
          onClick={onEditNumber}
          disabled={isLoading}
          className="group flex items-center gap-2 transition-colors hover:text-white"
        >
          <div className="flex items-center justify-center rounded-full bg-zinc-800/50 p-1.5 group-hover:bg-zinc-800 transition-colors">
            <Iconify icon="solar:pen-linear" className="text-sm" />
          </div>
          ویرایش شماره
        </button>

        {countdown > 0 ? (
          <div className="flex items-center gap-2 text-amber-500/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
            <Iconify icon="solar:clock-circle-bold" />
            <span className="font-mono pt-0.5 min-w-[2ch] text-center">
              {countdown}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onResend}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-amber-400 transition-colors hover:text-amber-300 font-medium"
          >
            ارسال مجدد
            <Iconify icon="solar:refresh-linear" />
          </button>
        )}
      </div>

      <Button
        fullWidth
        type="submit"
        size="lg"
        className={`font-bold h-12 text-base transition-all duration-300 ${
          isComplete
            ? "bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            : "bg-zinc-800 text-zinc-400 border border-white/5 hover:bg-zinc-700 hover:text-white"
        }`}
        isLoading={isLoading}
        isDisabled={!isComplete}
      >
        {isLoading ? "در حال بررسی..." : "ورود به حساب"}
      </Button>
    </motion.form>
  );
};

export default OtpVerification;