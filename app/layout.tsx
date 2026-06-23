import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from '@clerk/nextjs'
import NavBar from "./_componentes/BarraInicio";
import { esAdmin } from "./lib/rolAdmin";
import { Climate_Crisis, Bricolage_Grotesque, Manrope } from 'next/font/google';
import Footer from "./_componentes/Footer";
import BarraInicio from "./_componentes/BarraInicio";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const climateCrisis = Climate_Crisis({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-climate',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: "Eventia",
  description: "La plataforma definitiva para organizar eventos, vender entradas y gestionar pagos de manera simple, segura y confiable.",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${climateCrisis.variable} ${bricolage.variable} ${manrope.variable} h-full antialiased`}
    >
      <ClerkProvider>
        <body className="min-h-full bg-white text-slate-900 flex flex-col">
          <BarraInicio />
          <main className="flex-1 min-w-0">{children}</main>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}