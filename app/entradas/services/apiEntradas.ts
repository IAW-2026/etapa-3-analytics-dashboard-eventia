"use server";

export type Entrada = {
  id_entrada: string | number;
  id_pedido: string | number;
  id_evento: string | number;
  estado: string;
  creado: string;
  id_usuario: string | number;
  id_organizador: string | number;
};

export async function fetchEntradas(): Promise<Entrada[]> {
  const base = process.env.SHIPPING_BASE_URL;
  const res = await fetch(`${base}/api/shipping/datos/entradas`, {
    headers: { 'x-api-key': process.env.SHIPPING_API_KEY || '' },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

  const data = await res.json();
  return Array.isArray(data) ? data : (data.eventos ?? data.data ?? data.results ?? []);
}