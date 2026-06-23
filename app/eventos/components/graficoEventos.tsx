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
    <div className="eventia-card p-6 w-full max-w-(--size-xl) flex flex-col justify-between">
      <div>
        <h3 className="font-display text-2xl text-(--color-ink) tracking-wide">
          Eventos por Categoría
        </h3>
        <p className="font-body text-xs text-(--color-text-muted) mt-1 mb-4">
          Distribución total de la oferta de eventos disponibles
        </p>
      </div>

      {/* Contenedor del Gráfico de Torta */}
      <div className="w-full h-60 font-label flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50} 
              outerRadius={80}
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
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-muted)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}