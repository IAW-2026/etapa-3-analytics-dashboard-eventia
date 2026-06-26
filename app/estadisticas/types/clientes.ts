export type Cliente = {
  id_usuario: string;
  nombre_usuario: string;
  mail: string;
};

export type ClientesResponse = Cliente[] | {
  clientes?: Cliente[];
  data?: Cliente[];
  results?: Cliente[];
};
