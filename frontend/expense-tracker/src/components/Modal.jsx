import React, { useEffect } from "react"
import { LuX } from "react-icons/lu"

const Modal = ({ children, isOpen, onClose, title }) => {

  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEsc)

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-6">

        <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl">

          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-[#0f172a]">
              {title}
            </h3>

            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#0f172a]"
            >
              <LuX size={18} />
            </button>
          </div>

          <div className="px-6 py-6">
            {children}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Modal