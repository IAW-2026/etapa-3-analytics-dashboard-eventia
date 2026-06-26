export type Venta = {
  id_transaccion?: string;
  monto_bruto?: number | string | null;
  porcentaje_comision?: number | string | null;
  monto_comision?: number | string | null;
  monto_neto_vendedor?: number | string | null;
  moneda?: string | null;
};

export type VentasResponse = Venta[] | {
  data?: Venta[];
  ventas?: Venta[];
};
