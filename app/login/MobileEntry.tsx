import React from "react";
import { Button, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { formatMobileNumber, getDisplayMobile } from "@/utils/utils";

interface MobileEntryProps {
  mobile: string;
  setMobile: (val: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const MobileEntry = ({ mobile, setMobile, isLoading, onSubmit }: MobileEntryProps) => {
  const handleChange = (value: string) => {
    const numbers = formatMobileNumber(value);
    if (numbers.length <= 11) {
      setMobile(numbers);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      if (!isLoading && mobile.length >= 11) {
        onSubmit();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && mobile.length >= 11) {
      onSubmit();
    }
  };

  return (
    <motion.form
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <Input
        autoFocus
        type="tel"
        dir="ltr"
        size="lg"
        label="شماره موبایل ۹۸+"
        labelPlacement="outside"
        value={getDisplayMobile(mobile)}
        onValueChange={handleChange}
        onKeyDown={handleKeyDown} 
        isDisabled={isLoading}
        placeholder="0912 345 6789"
        classNames={{
          label: "text-zinc-400 text-xs right-0 origin-right rtl:right-0 rtl:left-auto",
          input: "text-lg text-white font-mono placeholder:text-zinc-700 px-4 py-3 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 transition-all",
          inputWrapper: "p-0 bg-zinc-900/50 border-zinc-800 data-[hover=true]:border-amber-500/30 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:ring-amber-500/20 h-14",
          mainWrapper: "dir-ltr",
        }}
      />

      <Button
        fullWidth
        type="submit"
        size="lg"
        className="h-14 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center"
        isLoading={isLoading}
        isDisabled={mobile.length < 11}
        spinnerPlacement="end"
      >
        دریافت کد تایید
      </Button>
    </motion.form>
  );
};

export default MobileEntry;