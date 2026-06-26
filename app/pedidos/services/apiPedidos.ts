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

export type Pedido = {
  idPedido: number;
  idEvento: number;
  cantEntradas: number;
  monto: number;
  estado: string; // "APROBADO", "PENDIENTE", etc.
};


export type EventoMasVendido = {
  name: string;      
  cantidad: number;  
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

export async function fetchPedidos(): Promise<Pedido[]> {
  const base = process.env.SELLER_BASE_URL!.replace(/\/$/, '');
  const res = await fetch(`${base}/api/seller/datos/pedidos`, {
    headers: { 'x-api-key': process.env.SELLER_API_KEY!.trim() },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return Array.isArray(data) ? data : (data.pedidos ?? data.data ?? data.results ?? []);
}


export async function fetchTopEventosMasVendidos(): Promise<EventoMasVendido[]> {
  try {
    const [pedidos, eventos] = await Promise.all([
      fetchPedidos(),
      fetchEventos()
    ]);


    const pedidosValidos = pedidos.filter(p => p.estado.toUpperCase() !== "CANCELADO" && p.estado.toUpperCase() !== "PENDIENTE");

    const ventasPorEvento = pedidosValidos.reduce((acc: Record<number, number>, pedido) => {
      acc[pedido.idEvento] = (acc[pedido.idEvento] || 0) + pedido.cantEntradas;
      return acc;
    }, {});

    const diccionarioEventos = new Map<number, string>();
    eventos.forEach(e => {
      if (e.nombreEvento) diccionarioEventos.set(e.idEvento, e.nombreEvento);
    });

    const ranking: EventoMasVendido[] = Object.keys(ventasPorEvento)
      .map((idStr) => {
        const id = Number(idStr);
        return {
          name: diccionarioEventos.get(id) || `Evento Desconocido (#${id})`,
          cantidad: ventasPorEvento[id],
        };
      })
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);

    return ranking;
  } catch (error) {
    console.error("Error procesando el top de eventos mas vendidos:", error);
    throw error;
  }
}