import React from "react"
import { getInitials } from "../../utils/helper"

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`
        ${width || "w-11"} 
        ${height || "h-11"} 
        ${style || ""}
        flex items-center justify-center
        rounded-full
        bg-gray-200
        text-[#0f172a]
        text-sm
        font-semibold
        border border-gray-300
        shadow-sm
      `}
    >
      {getInitials(fullName || "")}
    </div>
  )
}

export default CharAvatar