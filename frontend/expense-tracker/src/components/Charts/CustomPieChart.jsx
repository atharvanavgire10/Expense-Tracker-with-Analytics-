import React from "react"
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts"
import CustomTooltip from "./CustomTooltip"
import CustomLegend from "./CustomLegend"

const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = [],
  showTextAnchor
}) => {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length]
  }))

  return (
    <div className="bg-white mt-6 rounded-lg border border-gray-200 shadow-md p-6">
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={coloredData}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={90}
            paddingAngle={2}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {coloredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-12}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="13px"
                fontWeight="500"
              >
                {label}
              </text>

              <text
                x="50%"
                y="50%"
                dy={14}
                textAnchor="middle"
                fill="#0f172a"
                fontSize="20px"
                fontWeight="700"
              >
                ₹{totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart