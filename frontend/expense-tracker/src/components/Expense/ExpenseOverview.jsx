import React, { useEffect, useState } from "react"
import { LuPlus } from "react-icons/lu"
import CustomLineChart from "../Charts/CustomLineChart"
import { prepareExpenseLineChartData } from "../../utils/helper"

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (!Array.isArray(transactions)) {
      setChartData([])
      return
    }

    const result = prepareExpenseLineChartData(transactions)
    setChartData(result)
  }, [transactions])

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h5 className="text-base font-semibold text-[#0f172a]">
            Expense Overview
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Expense trend analysis
          </p>
        </div>

        <button className="add-btn add-btn-fill" onClick={onAddExpense}>
          <LuPlus size={16} />
          Add Expense
        </button>
      </div>

      <div className="mt-8">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  )
}

export default ExpenseOverview