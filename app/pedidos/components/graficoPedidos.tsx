"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { fetchTopEventosMasVendidos, EventoMasVendido } from "../services/apiPedidos";

export default function TarjetaGraficoEventosMasVendidos() {
  const [data, setData] = useState<EventoMasVendido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        setLoading(true);
        // Llamamos a la función que ya hace todo el cruce y ordenamiento en el servidor 🚀
        const ranking = await fetchTopEventosMasVendidos();
        setData(ranking);
      } catch (err) {
        setError("No se pudieron cargar las estadísticas de ventas.");
      } finally {
        setLoading(false);
      }
    }
    cargarDatos();
  }, []);

  if (loading) {
    return (
      <div className="eventia-card flex items-center justify-center p-6 w-full max-w-(--size-xl) h-[340px]">
        <p className="font-label text-sm text-(--color-text-muted) animate-pulse">
          Calculando ranking de ventas...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="eventia-card flex items-center justify-center p-6 w-full max-w-(--size-xl) border-destructive/30">
        <p className="font-label text-sm text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="eventia-card p-6 w-full max-w-(--size-xl) flex flex-col justify-between">
      <div>
        <h3 className="font-display text-2xl text-(--color-ink) tracking-wide">
          Top Eventos Más Vendidos
        </h3>
        <p className="font-body text-xs text-(--color-text-muted) mt-1 mb-5">
          Ranking en base a la cantidad total de entradas adquiridas por los usuarios
        </p>
      </div>

      <div className="w-full h-64 font-label">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
            <XAxis type="number" stroke="var(--color-text-muted)" fontSize={11} tickLine={false} />
            <YAxis dataKey="name" type="category" stroke="var(--color-text-muted)" fontSize={11} tickLine={false} width={100} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--color-surface-soft)", 
                borderRadius: "var(--radius)", 
                color: "var(--color-ink)", 
                border: "1px solid var(--color-border)",
                fontFamily: "var(--ff-label, Arial, sans-serif)",
                fontSize: "12px",
                boxShadow: "var(--color-shadow)"
              }}
              itemStyle={{ color: "var(--color-primary-vivid)", fontWeight: 700 }}
              cursor={{ fill: "var(--color-surface-soft-2)", opacity: 0.4 }}
              formatter={(value) => [`${value} entradas`, "Total Vendido"]}
            />
            <Bar 
              dataKey="cantidad" 
              fill="var(--color-primary-muted)" 
              activeBar={{ fill: "var(--color-primary-vivid)" }}
              radius={[0, 6, 6, 0]} 
              barSize={24} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}