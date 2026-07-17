import React from "react"
import { LuDownload } from "react-icons/lu"
import TransactionInfoCard from "../Cards/TransactionInfoCard"
import moment from "moment"

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-base font-semibold text-[#0f172a]">
          Expense Records
        </h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload size={16} />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            No expense records available.
          </p>
        )}
      </div>
    </div>
  )
}

export default ExpenseList