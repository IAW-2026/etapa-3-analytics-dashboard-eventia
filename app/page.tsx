<<<<<<< HEAD
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eventia - Descubrí y creá eventos',
  description: 'La plataforma para organizar eventos y vender entradas de manera fácil y segura.',
};

export default function HomePage() {
  return (
    // Fondo: dos radiales suaves + crema base, igual al mockup
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(900px 600px at 85% -5%, rgba(254, 158, 162, 0.22), transparent 60%),
          radial-gradient(700px 500px at -5% 30%, rgba(101, 0, 3, 0.05), transparent 55%),
          var(--color-surface-alt)
        `,
      }}
    >
      
      <HeroSection />
    </div>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="grid min-h-[calc(100svh-72px)] grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
      {/* Columna izquierda: copy + CTA */}
      <div className="flex flex-col items-start justify-center gap-[22px] px-8 py-12 sm:px-14">
        <span
          className="font-label inline-flex items-center gap-2 rounded-full px-[14px] py-[7px] text-[11px] font-extrabold uppercase tracking-[0.14em]"
          style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
        >
          Bienvenido a Eventia
        </span>

        <h1
          className="font-display leading-[0.92] tracking-[-0.01em]"
          style={{ fontSize: 'clamp(40px,6.2vw,78px)', color: 'var(--color-ink)' }}
        >
          Descubrí,{' '}
          <span style={{ color: 'var(--color-primary)' }}>creá</span>{' '}
          y viví los mejores <span style={{ color: 'var(--color-primary)' }}>eventos</span>
        </h1>

        <p className="font-body max-w-[430px] text-[18px] leading-[1.6]" style={{ color: 'var(--color-text-muted)' }}>
          La plataforma para monitorear todas las estadísticas de tus eventos.
        </p>
        
        {/* CONTENEDOR DE BOTONES (CTAs) */}
        <div className="mt-2 flex flex-wrap gap-4 font-label text-[14px] font-bold">
          <Link
            href='./estadisticas'
            className="eventia-button eventia-button--accent group"
          >
            Ver Estadísticas
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

      {/* Columna derecha: imagen */}
      <div className="relative h-[260px] overflow-hidden lg:h-auto">
        <Image
          src="/imgHome.jpeg"
          alt="Imagen de evento"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </section>
  );
}
=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
>>>>>>> origin/main
