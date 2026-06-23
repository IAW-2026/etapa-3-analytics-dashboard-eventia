export async function getTransacciones() {
  const URL_BASE = process.env.PAYMENTS_BASE_URL?.trim();
  const API_KEY = process.env.PAYMENTS_API_KEY?.trim();

  if (!URL_BASE) {
    throw new Error("Falta configurar PAYMENTS_BASE_URL");
  }

  const response = await fetch(
    new URL("/api/payments/datos/transacciones", URL_BASE),
    {
      cache: "no-store",
      headers: API_KEY ? { "x-api-key": API_KEY } : undefined,
    }
  );

  if (!response.ok) {
    throw new Error(`Error obteniendo transacciones (${response.status})`);
  }

  return response.json();
}

export async function getVentas() {
  const URL_BASE = process.env.PAYMENTS_BASE_URL?.trim();
  const API_KEY = process.env.PAYMENTS_API_KEY?.trim();

  if (!URL_BASE) {
    throw new Error("Falta configurar PAYMENTS_BASE_URL");
  }

  const response = await fetch(
    new URL("/api/payments/datos/ventas", URL_BASE),
    {
      cache: "no-store",
      headers: API_KEY ? { "x-api-key": API_KEY } : undefined,
    }
  );

  if (!response.ok) {
    throw new Error(`Error obteniendo ventas (${response.status})`);
  }

  return response.json();
}
