import { Truck, Shield, CreditCard, MessageCircle, Star } from "lucide-react";

const trustItems = [
  { icon: CreditCard, text: "الدفع عند الاستلام" },
  { icon: Truck, text: "توصيل سريع داخل السعودية" },
  { icon: Shield, text: "ضمان استبدال عند وجود عيب" },
  { icon: MessageCircle, text: "دعم واتساب" },
  { icon: Star, text: "منتجات مختارة للحر والغبار" },
];

export function TrustStrip() {
  return (
    <div className="bg-[#0F172A] text-white py-3 overflow-x-auto">
      <div className="max-w-content mx-auto px-4">
        <div className="flex items-center justify-center gap-4 md:gap-8 min-w-max mx-auto">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
              <item.icon className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
              <span className="text-[#E0F2FE]">{item.text}</span>
              {i < trustItems.length - 1 && (
                <span className="text-[#334155] mr-2 hidden md:inline">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
