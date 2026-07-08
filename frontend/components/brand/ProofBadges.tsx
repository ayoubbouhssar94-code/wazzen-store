import { Shield, Zap, Award, Wind } from "lucide-react";

const badges = [
  { icon: Shield, text: "مواد مختبرة" },
  { icon: Wind, text: "مصممة لظروف القيادة في السعودية" },
  { icon: Zap, text: "جاهزة للاستخدام الفوري" },
  { icon: Award, text: "مطابقة لمتطلبات الجودة" },
];

export function ProofBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {badges.map((b, i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-[#E0F2FE] rounded-xl px-3 py-2"
        >
          <b.icon className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
          <span className="text-xs text-[#0F172A] font-medium">{b.text}</span>
        </div>
      ))}
    </div>
  );
}
