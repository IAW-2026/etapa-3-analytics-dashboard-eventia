"use server";

export type Evento = {
  idEvento: number;
  nombreEvento: string | null;
  fecha: string | null;
  ubicacion: string | null;
  stock: number | null;
  idOrganizador: string;
  organizador?: { nombreOrganizador: string | null; apellido: string | null } | null;
  precio: number | null;
  categoria: string | null;
};

export async function fetchEventos(): Promise<Evento[]> {
  const base = process.env.SELLER_BASE_URL!.replace(/\/$/, '');
  const res = await fetch(`${base}/api/seller/datos/eventos`, {
    headers: { 'x-api-key': process.env.SELLER_API_KEY!.trim() },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

  const data = await res.json();
  return Array.isArray(data) ? data : (data.eventos ?? data.data ?? data.results ?? []);
}