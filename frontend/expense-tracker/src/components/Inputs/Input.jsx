import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      
      <label className="text-sm font-medium text-[#0f172a]">
        {label}
      </label>

      <div className="relative">

        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pr-11 text-sm bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#0f172a] focus:border-transparent transition"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#0f172a] transition"
          >
            {showPassword ? (
              <FaRegEyeSlash size={18} />
            ) : (
              <FaRegEye size={18} />
            )}
          </button>
        )}

      </div>
    </div>
  )
}

export default Input