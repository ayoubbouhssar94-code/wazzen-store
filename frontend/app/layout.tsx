import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutOrchestrator } from "@/components/checkout/CheckoutOrchestrator";
import { TrackingProvider } from "@/components/tracking/TrackingProvider";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import { TikTokPixel } from "@/components/tracking/TikTokPixel";
import { SnapPixel } from "@/components/tracking/SnapPixel";

export const metadata: Metadata = {
  title: "وازن | منتجات ذكية لراحة السيارة في السعودية",
  description:
    "وازن - منتجات مصممة لظروف القيادة اليومية في السعودية: حماية من الشمس، ترتيب داخلي، وتنظيف سريع. الدفع عند الاستلام.",
  keywords: "مظلة سيارة, حشوة كونسول, مكنسة سيارة, منتجات سيارة السعودية, وازن",
  openGraph: {
    title: "وازن | راحة ونظافة وحماية لسيارتك",
    description: "منتجات ذكية لراحة السيارة في السعودية. الدفع عند الاستلام.",
    locale: "ar_SA",
    type: "website",
    url: "https://wazzen.shop",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://wazzen.shop"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MetaPixel />
        <TikTokPixel />
        <SnapPixel />
        <TrackingProvider />

        <Header />
        <main>{children}</main>
        <Footer />

        <CartDrawer />
        <CheckoutOrchestrator />
      </body>
    </html>
  );
}
