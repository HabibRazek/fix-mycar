"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { category: "Moteur", count: 12 },
  { category: "Freins", count: 8 },
  { category: "Électrique", count: 15 },
  { category: "Suspension", count: 6 },
  { category: "Transmission", count: 4 },
  { category: "Autres", count: 10 },
];

export function IssuesChart() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Problèmes par catégorie
        </h3>
        <p className="text-sm text-gray-500">
          Répartition des problèmes détectés
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="category"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
            name="Nombre de problèmes"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

