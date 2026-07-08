"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useCartStore } from "@/lib/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "المنتجات" },
  { href: "/delivery", label: "التوصيل" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCartStore();
  const count = itemCount();

  return (
    <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-content mx-auto px-5 h-16">

        {/* 3-column grid: Logo | Nav | Cart */}
        <div className="grid grid-cols-3 items-center h-full">

          {/* Col 1 – Logo (RTL: appears on right) */}
          <div className="flex justify-start">
            <Link href="/" aria-label="وازن" className="flex-shrink-0">
              <Logo size="sm" />
            </Link>
          </div>

          {/* Col 2 – Center nav (desktop only) */}
          <nav className="hidden md:flex items-center justify-center gap-0.5" aria-label="القائمة الرئيسية">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-lg text-sm text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all font-medium whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Col 3 – Cart + hamburger (RTL: appears on left) */}
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#F1F5F9] transition-colors"
              aria-label={`السلة${count > 0 ? ` (${count})` : ""}`}
            >
              <ShoppingCart className="w-5 h-5 text-[#0F172A]" />
              {count > 0 && (
                <span className="bg-[#10B981] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              {menuOpen
                ? <X className="w-5 h-5 text-[#0F172A]" />
                : <Menu className="w-5 h-5 text-[#0F172A]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 bg-white border-t border-[#F1F5F9]",
          menuOpen ? "max-h-72" : "max-h-0"
        )}
      >
        <nav className="px-5 py-3 flex flex-col gap-0.5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors font-medium"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
