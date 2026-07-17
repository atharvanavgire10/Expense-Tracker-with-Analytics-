import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === "income";

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-4 mt-3 shadow-sm">
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-[#0f172a]">
          {icon ? (
            <img src={icon} alt={title} className="w-5 h-5 object-contain" />
          ) : (
            <LuUtensils size={18} />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-[#0f172a]">
            {title}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600 transition"
          >
            <LuTrash2 size={18} />
          </button>
        )}

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${
              isIncome ? "text-green-600" : "text-red-600"
            }`}
          >
            {isIncome ? "+" : "-"} ₹{amount}
          </span>

          {isIncome ? (
            <LuTrendingUp size={16} className="text-green-600" />
          ) : (
            <LuTrendingDown size={16} className="text-red-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;