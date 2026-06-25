import { Users } from 'lucide-react';
import { fetchOrganizadores } from '@/app/organizadores/services/apiOrganizadores';
import type { ClientesResponse } from '@/app/estadisticas/types';

function obtenerListaClientes(data: ClientesResponse) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.clientes ?? data.data ?? data.results ?? [];
}

export default async function OrganizadoresActivos() {
  let totalOrganizadores = 0;
  let error: string | null = null;

  try {
    const organizadores =await fetchOrganizadores();
    totalOrganizadores = organizadores.length;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    error = 'No se pudieron obtener los organizadores.';
  }

  return (
    <article className="eventia-card eventia-stat-card">
      <div className="eventia-stat-card-header">
        <p className="eventia-stat-card-label">Organizadores</p>
        <span className="eventia-stat-card-icon" aria-hidden="true">
          <Users className="h-5 w-5" />
        </span>
      </div>

      <div>
        <strong className="eventia-stat-card-value">{totalOrganizadores}</strong>
        <p className="eventia-stat-card-copy ">
          {error ?? 'Cantidad total de organizadores registrados.'}
        </p>
      </div>
    </article>
  );
}
