import React from "react"
import { LuArrowRight } from "react-icons/lu"
import TransactionInfoCard from "../Cards/TransactionInfoCard"
import moment from "moment"

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-base font-semibold text-[#0f172a]">
          Income Transactions
        </h5>

        <button className="card-btn" onClick={onSeeMore}>
          View All
          <LuArrowRight size={16} />
        </button>
      </div>

      <div className="mt-6">
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            No income records available.
          </p>
        )}
      </div>
    </div>
  )
}

export default RecentIncome