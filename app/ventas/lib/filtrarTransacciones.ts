import type { TransaccionConEstado } from '@/app/estadisticas/types';

export const ESTADOS_TRANSACCION = {
  CANCELADA: 'CANCELADA',
} as const;

export type EstadoTransaccion = (typeof ESTADOS_TRANSACCION)[keyof typeof ESTADOS_TRANSACCION];

export function obtenerEstadoTransaccion(transaccion: TransaccionConEstado) {
  return transaccion.estado_transaccion?.toUpperCase();
}

export function filtrarMetricas(
  transacciones: TransaccionConEstado[],
  estado: EstadoTransaccion
) {
  return transacciones.filter((transaccion) => obtenerEstadoTransaccion(transaccion) === estado);
}

export function filtrarTransaccionesCanceladas(transacciones: TransaccionConEstado[]) {
  return filtrarMetricas(transacciones, ESTADOS_TRANSACCION.CANCELADA);
}
