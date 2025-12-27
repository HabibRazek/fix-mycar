"use client";

import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", maintenance: 150, repairs: 0 },
  { month: "Fév", maintenance: 200, repairs: 450 },
  { month: "Mar", maintenance: 150, repairs: 0 },
  { month: "Avr", maintenance: 180, repairs: 320 },
  { month: "Mai", maintenance: 150, repairs: 0 },
  { month: "Juin", maintenance: 220, repairs: 580 },
];

export function CostAnalysisChart() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Analyse des coûts
        </h3>
        <p className="text-sm text-gray-500">
          Évolution des dépenses de maintenance et réparations (€)
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorMaintenance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRepairs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
          />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            formatter={(value) => `${value}€`}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="maintenance"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorMaintenance)"
            name="Maintenance"
          />
          <Area
            type="monotone"
            dataKey="repairs"
            stroke="#f59e0b"
            fillOpacity={1}
            fill="url(#colorRepairs)"
            name="Réparations"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

