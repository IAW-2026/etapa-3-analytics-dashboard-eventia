import { XCircle } from 'lucide-react';
import { getTransacciones } from '@/app/ventas/lib/api';
import {
  filtrarTransaccionesCanceladas,
  type TransaccionConEstado,
} from '@/app/ventas/lib/filtrarMetricas';

type TransaccionesResponse =
  | TransaccionConEstado[]
  | {
      data?: TransaccionConEstado[];
      transacciones?: TransaccionConEstado[];
    };

function obtenerListaTransacciones(data: TransaccionesResponse) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.transacciones ?? data.data ?? [];
}

export default async function TransaccionesCanceladasCard() {
  let cantidadCanceladas = 0;
  let error: string | null = null;

  try {
    const data = (await getTransacciones()) as TransaccionesResponse;
    const transacciones = obtenerListaTransacciones(data);


    cantidadCanceladas = filtrarTransaccionesCanceladas(transacciones).length;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    error = 'No se pudieron obtener las transacciones.';
  }

  return (
    <article className="eventia-card eventia-card--side eventia-stat-card">
      <div className="eventia-stat-card-header">
        <p className="eventia-stat-card-label">Transacciones canceladas</p>
        <span className="eventia-stat-card-icon" aria-hidden="true">
          <XCircle className="h-5 w-5" />
        </span>
      </div>

      <div>
        <strong className="eventia-stat-card-value">{cantidadCanceladas}</strong>
        <p className="eventia-stat-card-copy">
          {error ?? 'Operaciones informadas como canceladas por el servicio de pagos.'}
        </p>
      </div>
    </article>
  );
}
