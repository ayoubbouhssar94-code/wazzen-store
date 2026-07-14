import Image from "next/image";
import { cn } from "@/lib/utils";

type SectionImagePlaceholderProps = {
  labelAr?: string;
  aspectRatio?: "1:1" | "4:3" | "16:9" | "3:4";
  color?: string;
  className?: string;
  /** Real product photo path (e.g. "/products/foo.png"). Falls back to the styled placeholder when omitted. */
  src?: string;
  /** How the image fills its container when src is set */
  imageFit?: "cover" | "contain";
};

const aspectClasses: Record<string, string> = {
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "3:4": "aspect-[3/4]",
};

export function SectionImagePlaceholder({
  labelAr = "صورة المنتج",
  aspectRatio = "1:1",
  color = "#0EA5E9",
  className,
  src,
  imageFit = "cover",
}: SectionImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl flex items-center justify-center overflow-hidden relative bg-[#F8FAFC]",
          aspectClasses[aspectRatio],
          className
        )}
        style={{ border: `1.5px solid ${color}22` }}
      >
        <Image
          src={src}
          alt={labelAr}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className={imageFit === "contain" ? "object-contain p-3" : "object-cover"}
          priority={false}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full rounded-2xl flex items-center justify-center overflow-hidden",
        aspectClasses[aspectRatio],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
        border: `1.5px solid ${color}33`,
      }}
      aria-label={labelAr}
      role="img"
    >
      <div className="flex flex-col items-center gap-2 text-center p-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: `${color}22` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <span
          className="text-sm font-medium"
          style={{ color }}
        >
          {labelAr}
        </span>
      </div>
    </div>
  );
}
