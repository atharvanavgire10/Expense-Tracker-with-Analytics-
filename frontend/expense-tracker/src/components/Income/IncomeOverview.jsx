import React, { useEffect, useState } from "react"
import { LuPlus } from "react-icons/lu"
import CustomBarChart from "../Charts/CustomBarChart"
import { prepareIncomeBarChartData } from "../../utils/helper"

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (!Array.isArray(transactions)) {
      setChartData([])
      return
    }

    const result = prepareIncomeBarChartData(transactions)
    setChartData(result)
  }, [transactions])

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h5 className="text-base font-semibold text-[#0f172a]">
            Income Overview
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Income trend analysis
          </p>
        </div>

        <button
          className="add-btn add-btn-fill"
          onClick={onAddIncome}
        >
          <LuPlus size={16} />
          Add Income
        </button>
      </div>

      <div className="mt-8">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  )
}

export default IncomeOverview