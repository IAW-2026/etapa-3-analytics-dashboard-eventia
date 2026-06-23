export async function getClientes() {
  const URL_BASE = process.env.BUYER_BASE_URL?.trim();
  const API_KEY = process.env.BUYER_API_KEY?.trim();

  if (!URL_BASE) {
    throw new Error("Falta configurar BUYER_BASE_URL");
  }

  const response = await fetch(
    new URL("/api/buyer/datos/clientes", URL_BASE),
    {
      cache: "no-store",
      headers: API_KEY ? { "x-api-key": API_KEY } : undefined,
    }
  );

  if (!response.ok) {
    throw new Error(`Error obteniendo clientes (${response.status})`);
  }

  return response.json();
}
