import { WalletCards } from 'lucide-react';
import { getVentas } from '@/app/ventas/lib/apiPayments';
import type { Venta, VentasResponse } from '@/app/estadisticas/types';

function obtenerListaVentas(data: VentasResponse) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.ventas ?? data.data ?? [];
}

function obtenerMonto(valor: Venta['monto_neto_vendedor']) {
  return Number(valor ?? 0);
}

function formatearMoneda(monto: number, moneda = 'ARS') {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(monto);
}

export default async function TotalVentasCard() {
  let totalVentas = 0;
  let moneda = 'ARS';
  let error: string | null = null;

  try {
    const data = (await getVentas()) as VentasResponse;
    const ventas = obtenerListaVentas(data);
    moneda = ventas[0]?.moneda ?? moneda;
    totalVentas = ventas.reduce((total, venta) => total + obtenerMonto(venta.monto_neto_vendedor), 0);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    error = 'No se pudieron obtener las ventas.';
  }

  return (
    <article className="eventia-card eventia-stat-card">
      <div className="eventia-stat-card-header">
        <p className="eventia-stat-card-label">Neto para vendedores</p>
        <span className="eventia-stat-card-icon" aria-hidden="true">
          <WalletCards className="h-5 w-5" />
        </span>
      </div>

      <div>
        <strong className="eventia-stat-card-value">{formatearMoneda(totalVentas, moneda)}</strong>
        <p className="eventia-stat-card-copy">
          {error ?? 'Suma del monto neto correspondiente a ventas de vendedores.'}
        </p>
      </div>
    </article>
  );
}
