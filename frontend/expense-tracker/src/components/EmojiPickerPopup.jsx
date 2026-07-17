import React, { useState, useRef, useEffect } from "react"
import EmojiPicker from "emoji-picker-react"
import { LuImage } from "react-icons/lu"

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block" ref={pickerRef}>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition"
      >
        <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md">
          {icon ? (
            <img src={icon} alt="icon" className="w-8 h-8 object-contain" />
          ) : (
            <LuImage size={18} className="text-gray-500" />
          )}
        </div>

        <span className="text-sm font-medium text-[#0f172a]">
          {icon ? "Change Icon" : "Select Icon"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-3 z-40 animate-dropdownFade">
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-2">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                onSelect(emoji?.imageUrl || "")
                setIsOpen(false)
              }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default EmojiPickerPopup