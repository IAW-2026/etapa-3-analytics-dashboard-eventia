"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fetchEventos, Evento } from "../services/apiEventos";

type DataGrafico = {
  name: string;
  value: number;
};

const COLORES_EVENTIA = [
  "var(--color-primary)",
  "var(--color-primary-vivid)",
  "var(--color-primary-muted)",
  "var(--color-accent)",
  "var(--color-text-muted)",
];

export default function TarjetaGraficoCategorias() {
  const [data, setData] = useState<DataGrafico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        setLoading(true);

        const eventos = await fetchEventos();

        const conteo = eventos.reduce((acc: Record<string, number>, evento) => {
          const cat = evento.categoria ? evento.categoria.toUpperCase() : "OTROS";
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        }, {});

        const datosProcesados = Object.keys(conteo).map((categoria) => ({
          name: categoria,
          value: conteo[categoria],
        }));

        setData(datosProcesados);
      } catch (err) {
        console.error("Error al procesar las categorías:", err);
        setError("No se pudieron cargar las estadísticas por categoría.");
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
          Analizando categorías...
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
  <div className="eventia-card flex flex-col justify-between h-full overflow-hidden">
    <div className="p-6 pb-0">
      <h3 className="eventia-stat-card-label">
        Eventos por Categoría
      </h3>
      <p className="eventia-stat-card-copy mt-1">
        Distribución total de la oferta de eventos disponibles
      </p>
    </div>

    <div className="w-full h-64 font-label mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}  
            outerRadius={95}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORES_EVENTIA[index % COLORES_EVENTIA.length]} 
              />
            ))}
          </Pie>
          
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
            formatter={(value) => [`${value} eventos`, "Total"]}
          />

          <Legend 
            verticalAlign="bottom" 
            height={44}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ 
              fontSize: '11px', 
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--ff-label, Arial, sans-serif)',
              paddingBottom: '12px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);
}