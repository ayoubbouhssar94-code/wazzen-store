import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { mark: "w-9 h-9 text-lg", arabic: "text-xl", english: "text-[10px]" },
  md: { mark: "w-11 h-11 text-xl", arabic: "text-2xl", english: "text-xs" },
  lg: { mark: "w-14 h-14 text-2xl", arabic: "text-3xl", english: "text-sm" },
};

export function Logo({ className, size = "md" }: LogoProps) {
  const s = sizeMap[size];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white flex-shrink-0",
          "bg-gradient-to-br from-[#0EA5E9] to-[#0F172A]",
          s.mark
        )}
        aria-hidden="true"
      >
        W
      </div>
      <div className="flex flex-col leading-tight">
        <span className={cn("font-bold text-[#0F172A]", s.arabic)}>وازن</span>
        <span className={cn("tracking-widest text-[#64748B] font-light", s.english)}>
          wazzen
        </span>
      </div>
    </div>
  );
}
