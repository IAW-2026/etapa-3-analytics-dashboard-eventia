export type TransaccionConEstado = {
  estado_transaccion?: string | null;
};

export type TransaccionesResponse = TransaccionConEstado[] | {
  data?: TransaccionConEstado[];
  transacciones?: TransaccionConEstado[];
};
