import React from "react"
import CustomPieChart from "../Charts/CustomPieChart"

const COLORS = ["#0f172a", "#16a34a", "#dc2626"]

const FinanaceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Net Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-base font-semibold text-[#0f172a]">
          Financial Summary
        </h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Net Balance"
        totalAmount={totalBalance}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanaceOverview