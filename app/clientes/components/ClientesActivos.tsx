import { Users } from 'lucide-react';
import { getClientes } from '@/app/clientes/lib/apiClientes';
import type { ClientesResponse } from '@/app/estadisticas/types';

function obtenerListaClientes(data: ClientesResponse) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.clientes ?? data.data ?? data.results ?? [];
}

export default async function ClientesActivos() {
  let totalClientes = 0;
  let error: string | null = null;

  try {
    const data = (await getClientes()) as ClientesResponse;
    const clientes = obtenerListaClientes(data);
    totalClientes = clientes.length;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    error = 'No se pudieron obtener los compradores.';
  }

  return (
    <article className="eventia-card eventia-stat-card">
      <div className="eventia-stat-card-header">
        <p className="eventia-stat-card-label">Compradores</p>
        <span className="eventia-stat-card-icon" aria-hidden="true">
          <Users className="h-5 w-5" />
        </span>
      </div>

      <div>
        <strong className="eventia-stat-card-value">{totalClientes}</strong>
        <p className="eventia-stat-card-copy">
          {error ?? 'Cantidad total de clientes registrados como compradores.'}
        </p>
      </div>
    </article>
  );
}
