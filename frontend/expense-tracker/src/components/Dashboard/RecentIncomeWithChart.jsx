import React, { useEffect, useState } from "react"
import CustomPieChart from "../Charts/CustomPieChart"

const COLORS = ["#0f172a", "#16a34a", "#2563eb", "#dc2626"]

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    })) || []

    setChartData(dataArr)
  }, [data])

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-base font-semibold text-[#0f172a]">
          Income Breakdown (Last 60 Days)
        </h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={totalIncome}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  )
}

export default RecentIncomeWithChart