import React from "react"

const DeleteAlert = ({ content, onDelete, onClose }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md w-full">

      <p className="text-sm text-gray-700 leading-relaxed">
        {content}
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="button"
          className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>

    </div>
  )
}

export default DeleteAlert