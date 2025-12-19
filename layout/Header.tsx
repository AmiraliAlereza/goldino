import { Button, Link } from "@heroui/react"
import Iconify from "../components/Iconify"

const Header = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/20">
                            <Iconify icon="mdi:gold" className="text-2xl" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight block">گلدینو</span>
                    </Link>

                </div>


                {/* Links (Desktop) */}
                <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <Link href="/liveprice" className="text-zinc-400 hover:text-amber-400 transition-colors">قیمت لحظه‌ای</Link>
                    <Link href="/analysis" className="text-zinc-400 hover:text-amber-400 transition-colors">تحلیل بازار</Link>
                    <Link href="/help" className="text-zinc-400 hover:text-amber-400 transition-colors">راهنما</Link>
                    <Link href="/terms" className="text-zinc-400 hover:text-amber-400 transition-colors">قوانین و مقررات</Link>
                    <Link href="/support" className="text-zinc-400 hover:text-amber-400 transition-colors">پشتیبانی</Link>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link href="/login" >
                        <Button variant="light" className="text-white hidden sm:flex">

                            ورود
                        </Button>
                    </Link>

                    <Link href="/login" >

                        <Button variant="flat" className="bg-amber-500 alic text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                            ثبت‌نام رایگان
                        </Button>
                    </Link>

                </div>
            </div>
        </nav>
    )

}
export default Header