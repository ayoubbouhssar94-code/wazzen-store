"use client";

import { useEffect, useState } from "react";

const phrases = [
  "راحة في كل مشوار",
  "حماية أسرع من شمس الظهر",
  "ضغط الإطار الصحيح بضغطة",
  "عالج النقرة المناسبة قبل أن تتمدد",
  "الدفع فقط عند الاستلام",
  "توصيل 3-5 أيام لكل المملكة",
  "جودة مضمونة أو نستبدل",
];

export function RotatingText({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      {phrases[index]}
    </span>
  );
}
