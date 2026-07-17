import React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const CustomLineChart = ({ data = [] }) => {
  const CustomTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload

      return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm px-4 py-3">
          <p className="text-xs text-gray-600 mb-1">
            {item.month}
          </p>
          <p className="text-sm font-semibold text-[#0f172a]">
            ₹{item.amount}
          </p>
          {item.source && (
            <p className="text-xs text-gray-500 mt-1">
              {item.source}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white mt-6 rounded-lg border border-gray-200 shadow-md p-6">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="bankGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#0f172a" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="month"
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

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#0f172a"
            fill="url(#bankGradient)"
            strokeWidth={2}
            dot={{ r: 3, fill: "#0f172a" }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart