import { cn } from "@/lib/utils";

type ReviewStarsProps = {
  value?: string;
  count?: string;
  className?: string;
};

export function ReviewStars({ value = "4.8", count = "+1,200 طلب", className }: ReviewStarsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex text-[#D97706]" aria-label={`تقييم ${value} من 5`}>
        {"★★★★★".split("").map((star, i) => (
          <span key={i} className="text-base">{star}</span>
        ))}
      </div>
      <span className="text-sm text-[#0F172A] font-semibold">{value}</span>
      <span className="text-sm text-[#64748B]">| {count}</span>
    </div>
  );
}
