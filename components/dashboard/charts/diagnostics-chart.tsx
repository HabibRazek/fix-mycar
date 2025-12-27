"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", diagnostics: 4, resolved: 3 },
  { month: "Fév", diagnostics: 7, resolved: 5 },
  { month: "Mar", diagnostics: 5, resolved: 4 },
  { month: "Avr", diagnostics: 9, resolved: 7 },
  { month: "Mai", diagnostics: 12, resolved: 10 },
  { month: "Juin", diagnostics: 8, resolved: 8 },
];

export function DiagnosticsChart() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Diagnostics mensuels
        </h3>
        <p className="text-sm text-gray-500">
          Évolution de vos diagnostics au fil du temps
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="diagnostics"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Diagnostics"
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="resolved"
            stroke="#10b981"
            strokeWidth={2}
            name="Résolus"
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

