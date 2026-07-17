import React from "react"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-sm px-4 py-3">
        <p className="text-xs text-gray-600 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm font-semibold text-[#0f172a]">
          ₹{payload[0].value}
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltip