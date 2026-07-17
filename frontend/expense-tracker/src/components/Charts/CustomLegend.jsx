import React from "react"

const CustomLegend = ({ payload }) => {
  if (!payload || payload.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-4">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2"
        >
          <span
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend