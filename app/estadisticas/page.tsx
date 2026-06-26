import type { Metadata } from 'next';
import TransaccionesCanceladasCard from '../ventas/components/TransaccionesCanceladasCard';
import TotalGananciasCard from '../ventas/components/TotalGananciasCard';
import TotalVentasCard from '../ventas/components/TotalVentasCard';
import { TarjetaGraficoEntradas, TarjetaPorcentajeAsistencia } from '../entradas/components/graficoEntradas';
import ClientesActivos from '../clientes/components/ClientesActivos';
import OrganizadoresActivos from '../organizadores/components/OrganizadoresActivos';
import TarjetaGraficoEventosMasVendidos from '../pedidos/components/graficoPedidos';
import TarjetaGraficoCategorias from '../eventos/components/graficoEventos';
import { esAdmin } from '../lib/rolAdmin';
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: ' Eventia - Estadísticas',
  description: 'Panel de métricas de Eventia.',
};


export default async function Page() {
  const user = await currentUser();
  const publicMetadata = user?.publicMetadata;
  const admin = publicMetadata ? esAdmin(publicMetadata) : false;

  if (!admin) {
    return (
      <div className="eventia-page flex flex-col items-center justify-center p-6 text-center">
        <div className="eventia-card max-w-md flex flex-col items-center p-8 bg-[var(--color-surface-soft)]">

          <div className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-md">
            <ShieldAlert className="w-9 h-9 stroke-[2]" />
          </div>

          <h1 className="font-display text-3xl text-[var(--color-primary)] mb-3 uppercase tracking-tight">
            Acceso Restringido
          </h1>

          <p className="font-body text-sm text-[var(--color-text-muted)] max-w-sm mb-6 leading-relaxed">
            Este módulo está reservado exclusivamente para el personal de administración central de Eventia.
          </p>

          <Link
            href="/"
            className="eventia-button eventia-button--accent w-full text-center"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="eventia-page">
      <section className="eventia-page-shell">
        <div className="eventia-page-header">
          <div>
            <span className="eventia-page-kicker">Estadísticas</span>
            <h1 className="eventia-page-title">
              Métricas para entender tus <span className="eventia-page-title-accent">eventos</span>
            </h1>
            <p className="eventia-page-copy">
              Vista general de rendimiento, ventas y actividad para tomar decisiones con más contexto.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-start items-center mb-8 mt-2">
          <a
            href="#transacciones"
            className="inline-flex items-center justify-center px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-[var(--color-surface-soft-2)] hover:bg-[var(--color-accent)] text-[var(--color-accent-foreground)] border border-[rgba(101,0,3,0.08)] transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
          >Transacciones</a>
          <a
            href="#usuarios"
            className="inline-flex items-center justify-center px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-[var(--color-surface-soft-2)] hover:bg-[var(--color-accent)] text-[var(--color-accent-foreground)] border border-[rgba(101,0,3,0.08)] transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
          >Usuarios</a>
          <a
            href="#eventos"
            className="inline-flex items-center justify-center px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-[var(--color-surface-soft-2)] hover:bg-[var(--color-accent)] text-[var(--color-accent-foreground)] border border-[rgba(101,0,3,0.08)] transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
          > Eventos</a>
          <a
            href="#entradas"
            className="inline-flex items-center justify-center px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl bg-[var(--color-surface-soft-2)] hover:bg-[var(--color-accent)] text-[var(--color-accent-foreground)] border border-[rgba(101,0,3,0.08)] transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
          >Entradas</a>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="eventia-card-stack">

          <div id="transacciones" className="eventia-metrics-row scroll-mt-28">
            <TransaccionesCanceladasCard />
            <TotalGananciasCard />
            <TotalVentasCard />
          </div>

          <div id="usuarios" className="eventia-metrics-row scroll-mt-28">
            <ClientesActivos />
            <OrganizadoresActivos />
          </div>

          <div id="eventos" className="eventia-metrics-row scroll-mt-28">
            <div className="eventia-card flex-1 min-w-[300px] p-6">
              <TarjetaGraficoEventosMasVendidos />
            </div>
            <div className="eventia-card flex-1 min-w-[300px] p-6">
              <TarjetaGraficoCategorias />
            </div>
          </div>

          <div id="entradas" className="eventia-card p-6 scroll-mt-28">
            <TarjetaGraficoEntradas />
          </div>

          <div className="eventia-card p-6">
            <TarjetaPorcentajeAsistencia />
          </div>
        </div>
      </section>
    </div>
  );
}
