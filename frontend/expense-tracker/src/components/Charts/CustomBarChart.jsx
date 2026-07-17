import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const CustomBarChart = ({ data = [], xKey = "month" }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white mt-6 rounded-lg border border-gray-200 shadow-md p-8 text-center text-gray-500">
        No data available
      </div>
    )
  }

  const CustomTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload

      return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm px-4 py-3">
          <p className="text-xs font-medium text-gray-600 mb-1">
            {item[xKey]}
          </p>
          <p className="text-sm font-semibold text-[#0f172a]">
            ₹{payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white mt-6 rounded-lg border border-gray-200 shadow-md p-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltipContent />} />

          <Bar
            dataKey="amount"
            fill="#0f172a"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart