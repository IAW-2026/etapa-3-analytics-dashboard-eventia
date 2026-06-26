import { BadgeDollarSign } from 'lucide-react';
import { getVentas } from '@/app/ventas/lib/apiPayments';
import type { Venta, VentasResponse } from '@/app/estadisticas/types';

function obtenerListaVentas(data: VentasResponse) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.ventas ?? data.data ?? [];
}

function obtenerMonto(valor: Venta['monto_comision']) {
  return Number(valor ?? 0);
}

function formatearMoneda(monto: number, moneda = 'ARS') {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(monto);
}

export default async function TotalGananciasCard() {
  let totalGanancias = 0;
  let moneda = 'ARS';
  let error: string | null = null;

  try {
    const data = (await getVentas()) as VentasResponse;
    const ventas = obtenerListaVentas(data);
    moneda = ventas[0]?.moneda ?? moneda;
    totalGanancias = ventas.reduce((total, venta) => total + obtenerMonto(venta.monto_comision), 0);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    error = 'No se pudieron obtener las ventas.';
  }

  return (
    <article className="eventia-card eventia-stat-card">
      <div className="eventia-stat-card-header">
        <p className="eventia-stat-card-label">Ganancia por comisión</p>
        <span className="eventia-stat-card-icon" aria-hidden="true">
          <BadgeDollarSign className="h-5 w-5" />
        </span>
      </div>

      <div>
        <strong className="eventia-stat-card-value">{formatearMoneda(totalGanancias, moneda)}</strong>
        <p className="eventia-stat-card-copy">
          {error ?? 'Monto total que queda para Eventia a partir de las comisiones.'}
        </p>
      </div>
    </article>
  );
}
