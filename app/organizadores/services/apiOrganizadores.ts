"use server";

export type Organizador = {
  idOrganizador: string;
  nombreOrganizador: string | null;
  apellido: string | null;
  mail: string | null;
  activo: boolean | null;
};

export async function fetchOrganizadores(): Promise<Organizador[]> {
  const base = process.env.SELLER_BASE_URL!.replace(/\/$/, '');
  const res = await fetch(`${base}/api/seller/datos/organizadores`, {
    headers: { 'x-api-key': process.env.SELLER_API_KEY!.trim() },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

  const data = await res.json();
  return Array.isArray(data) ? data : (data.eventos ?? data.data ?? data.results ?? []);
}
