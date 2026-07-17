import React from "react"
import { LuArrowRight } from "react-icons/lu"
import TransactionInfoCard from "../Cards/TransactionInfoCard"
import moment from "moment"

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-base font-semibold text-[#0f172a]">
          Expense Transactions
        </h5>

        <button className="card-btn" onClick={onSeeMore}>
          View All
          <LuArrowRight size={16} />
        </button>
      </div>

      <div className="mt-6">
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
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

export default ExpenseTransactions