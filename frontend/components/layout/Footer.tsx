import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { MessageCircle } from "lucide-react";

const menuLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "المنتجات" },
  { href: "/delivery", label: "التوصيل" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

const policyLinks = [
  { href: "/privacy", label: "سياسة الخصوصية" },
  { href: "/returns", label: "الاستبدال والاسترجاع" },
  { href: "/shipping", label: "الشحن والتوصيل" },
  { href: "/terms", label: "الشروط والأحكام" },
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white mt-16">
      <div className="max-w-content mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#0F172A] flex items-center justify-center text-white font-bold text-sm">
                W
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-none">وازن</p>
                <p className="text-[#475569] text-xs tracking-widest">wazzen</p>
              </div>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              منتجات ذكية لراحة السيارة في السعودية.
              الدفع عند الاستلام، ودعم عربي سريع.
            </p>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#10B981] hover:text-white transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              تواصل عبر واتساب
            </a>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-semibold text-xs text-[#64748B] uppercase tracking-widest mb-4">
              الصفحات
            </h3>
            <ul className="space-y-2">
              {menuLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-xs text-[#64748B] uppercase tracking-widest mb-4">
              السياسات
            </h3>
            <ul className="space-y-2">
              {policyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#475569]">
            © {new Date().getFullYear()} وازن. جميع الحقوق محفوظة.
          </span>
          <span className="text-xs text-[#475569]">
            الدفع عند الاستلام · توصيل لجميع مناطق المملكة
          </span>
        </div>
      </div>
    </footer>
  );
}
