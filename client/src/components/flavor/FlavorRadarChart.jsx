import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { GlassCard } from "../ui/GlassCard.jsx";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-soft">
        <p className="text-slate-900 font-medium text-sm mb-1">
          {payload[0].payload.subject}
        </p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600">{entry.name}:</span>
              <span className="text-slate-900 font-semibold">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const FlavorRadarChart = ({
  data,
  dataKey1 = "A",
  dataKey2 = "B",
  name1 = "Item 1",
  name2 = "Item 2",
  showSecond = false,
}) => {
  return (
    <GlassCard className="p-6 h-full w-full flex flex-col">
      <h3 className="text-lg font-display font-semibold mb-4 text-slate-900">
        Flavor Vector Profile
      </h3>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="rgba(0,0,0,0.1)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#475569", fontSize: 12, fontFamily: "Inter" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name={name1}
              dataKey={dataKey1}
              stroke="#FF6B35"
              fill="#FF6B35"
              fillOpacity={0.4}
            />
            {showSecond && (
              <Radar
                name={name2}
                dataKey={dataKey2}
                stroke="#118AB2"
                fill="#118AB2"
                fillOpacity={0.4}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
