import type { Metadata } from 'next';
import { CalendarDays } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Estadísticas - Eventia',
  description: 'Panel de métricas de Eventia.',
};

export default function EstadisticasPage() {
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

          <button className="eventia-button eventia-button--accent" type="button">
            <CalendarDays className="h-4 w-4" />
            Este mes
          </button>
        </div>

        <div className="eventia-card-grid">
          <div className="eventia-card eventia-card--wide" />
          <div className="eventia-card eventia-card--side" />
          <div className="eventia-card eventia-card--full" />
        </div>
      </section>
    </div>
  );
}
