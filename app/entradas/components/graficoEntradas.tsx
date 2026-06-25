"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchEntradas } from "../services/apiEntradas";

type DataGrafico = {
  name: string;
  cantidad: number;
};

export function TarjetaGraficoEntradas() {
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


export function TarjetaPorcentajeAsistencia() {
  const [porcentaje, setPorcentaje] = useState<number>(0);
  const [totalUsadas, setTotalUsadas] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function calcularAsistencia() {
      try {
        setLoading(true);
        const entradas = await fetchEntradas(); // Reemplazar por tu llamada si cambia

        let deProntoUsadas = 0;
        let validasParaAsistir = 0;

        entradas.forEach((entrada) => {
          const estado = entrada.estado.toUpperCase();
          
          // Consideramos válidas las entradas que ya se usaron o que están confirmadas listas para usarse
          if (estado === "CONFIRMADO" || estado === "PAGADO") {
            validasParaAsistir++;
          } else if (estado === "USADO") {
            deProntoUsadas++;
            validasParaAsistir++;
          }
        });

        setTotalUsadas(deProntoUsadas);
        
        // Evitamos la división por cero si no hay entradas aún
        const calculo = validasParaAsistir > 0 
          ? Math.round((deProntoUsadas / validasParaAsistir) * 100) 
          : 0;

        setPorcentaje(calculo);
      } catch (err) {
        console.error("Error al calcular asistencia:", err);
        setError("No se pudo calcular el porcentaje.");
      } finally {
        setLoading(false);
      }
    }

    calcularAsistencia();
  }, []);

  if (loading) {
    return (
      <div className="eventia-card flex h-[360px] w-full items-center justify-center p-7">
        <p className="font-label animate-pulse text-sm text-(--color-text-muted)">
          Calculando asistencia...
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
    <div className="eventia-card flex flex-col justify-between h-full overflow-hidden p-6">
      <div>
        <h3 className="eventia-stat-card-label">
          Porcentaje de Asistencia
        </h3>
        <p className="eventia-stat-card-copy mt-1">
          Entradas acreditadas en puerta
        </p>
      </div>

      {/* Bloque central con el diseño de KPI de alto impacto visual */}
      <div className="flex flex-col items-center justify-center my-auto py-6">
        <div className="relative flex items-center justify-center">
          {/* El número gigante del porcentaje */}
          <span className="text-6xl font-black tracking-tight text-(--color-primary-vivid)">
            {porcentaje}%
          </span>
        </div>
        <p className="font-label text-xs text-(--color-text-muted) mt-3 bg-(--color-surface-soft) px-3 py-1 rounded-full border border-(--color-border)">
          {totalUsadas} {totalUsadas === 1 ? 'entrada usada' : 'entradas usadas'}
        </p>
      </div>

      {/* Barra de progreso sutil en la parte inferior */}
      <div className="w-full bg-(--color-surface-soft-2) h-2 rounded-full overflow-hidden realtive border border-(--color-border)">
        <div 
          className="bg-(--color-primary-muted) h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}