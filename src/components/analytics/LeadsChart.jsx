import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";

// Tooltip kustom untuk tampilkan detail leads
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const getValue = (key) => payload.find((p) => p.dataKey === key)?.value || 0;

  const complete = getValue("complete");
  const pending = getValue("pending");
  const total = complete + pending;

  return (
    <div className="bg-white border border-gray-300 rounded-md px-3 py-2 shadow-md">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <p className="text-sm text-emerald-600">{`Complete: ${complete}`}</p>
      <p className="text-sm text-yellow-600">{`Pending: ${pending}`}</p>
      <p className="text-sm text-blue-600">{`Total: ${total}`}</p>
    </div>
  );
};

const LeadsChart = ({ data }) => {
  const [barSize, setBarSize] = useState(30);

  // Ubah ukuran bar berdasarkan lebar layar
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setBarSize(isMobile ? 20 : 30);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // call once
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tambahkan nilai total untuk line chart (jika dibutuhkan)
  const enhancedData = data.map((item) => ({
    ...item,
    total: (item.complete || 0) + (item.pending || 0),
  }));

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4">
        Leads
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={enhancedData} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="2 6" stroke="#e5e7eb" />

          <XAxis
            dataKey="label"
            interval={0}
            angle={barSize === 20 ? -15 : 0}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            height={50}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fontWeight: 600, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />

          <Bar
            dataKey="complete"
            fill="#10b981"
            radius={[6, 6, 0, 0]}
            barSize={barSize}
            name="Complete"
          />

          <Bar
            dataKey="pending"
            fill="#facc15"
            radius={[6, 6, 0, 0]}
            barSize={barSize}
            name="Pending"
          />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Total Leads"
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadsChart;
