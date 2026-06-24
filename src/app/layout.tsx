import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { CONFIG } from "@/lib/config";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joaopaulo-personal.vercel.app"),
  title:
    "João Paulo · Personal Trainer | Treino Presencial, Domiciliar e Online",
  description: CONFIG.hero.sub,
  keywords: [
    "personal trainer",
    "treino em casa",
    "emagrecimento",
    "hipertrofia",
    "treino online",
    "consultoria nutricional",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title:
      "João Paulo · Personal Trainer | Treino Presencial, Domiciliar e Online",
    description: CONFIG.hero.sub,
    siteName: CONFIG.brand.name,
    images: [
      {
        url: "/logo-selo.png",
        alt: CONFIG.brand.fullTitle,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#080D18",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
