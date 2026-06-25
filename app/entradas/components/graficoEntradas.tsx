"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchEntradas } from "../services/apiEntradas";

type DataGrafico = {
  name: string;
  cantidad: number;
};

export default function TarjetaGraficoEntradas() {
  const [data, setData] = useState<DataGrafico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        setLoading(true);

        const entradas = await fetchEntradas();
        const conteo = entradas.reduce((acc: Record<string, number>, entrada) => {
          const estadoFormateado = entrada.estado.toUpperCase();
          acc[estadoFormateado] = (acc[estadoFormateado] || 0) + 1;
          return acc;
        }, {});

        const datosProcesados = Object.keys(conteo).map((estado) => ({
          name: estado,
          cantidad: conteo[estado],
        }));

        setData(datosProcesados);
      } catch (err) {
        console.error("Error al procesar el gráfico:", err);
        setError("No se pudieron cargar las estadísticas.");
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <div className="eventia-card flex h-[360px] w-full items-center justify-center p-7">
        <p className="font-label animate-pulse text-sm text-(--color-text-muted)">
          Cargando estadísticas...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="eventia-card flex w-full items-center justify-center border-destructive/30 p-7">
        <p className="font-label text-sm text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="eventia-card flex flex-col justify-between h-full overflow-hidden">
      <div className="p-6 pb-0">
        <h3 className="eventia-stat-card-label">
          Distribución de entradas
        </h3>
        <p className="eventia-stat-card-copy mt-1">
          Agrupado por estado de transacción
        </p>
      </div>

      <div className="h-64 w-full font-label">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="name"
              stroke="var(--color-text-muted)"
              fontSize={11}
              tickLine={false}
              dy={8}
            />
            <YAxis
              stroke="var(--color-text-muted)"
              fontSize={11}
              tickLine={false}
              allowDecimals={false}
              dx={-4}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface-soft)",
                borderRadius: "var(--radius)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-border)",
                fontFamily: "var(--ff-label, Arial, sans-serif)",
                fontSize: "12px",
                boxShadow: "var(--color-shadow)",
              }}
              itemStyle={{ color: "var(--color-primary-vivid)", fontWeight: 700 }}
              cursor={{ fill: "var(--color-surface-soft-2)", opacity: 0.6 }}
            />
            <Bar
              dataKey="cantidad"
              fill="var(--color-primary-muted)"
              activeBar={{ fill: "var(--color-primary-vivid)" }}
              radius={[6, 6, 0, 0]}
              barSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
