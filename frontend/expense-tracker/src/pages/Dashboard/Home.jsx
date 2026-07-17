import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate, useLocation } from "react-router-dom"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import InfoCard from "../../components/Cards/InfoCard"
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu"
import { IoMdCard } from "react-icons/io"
import { addThousandsSeparator } from "../../utils/helper"
import RecentTransactions from "../../components/Dashboard/RecentTransactions"
import FinanaceOverview from "../../components/Dashboard/FinanaceOverview"
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions"
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses"
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart"
import RecentIncome from "../../components/Dashboard/RecentIncome"

const Home = () => {
  useUserAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DATA
      )

      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [location.pathname])

  return (
    <DashboardLayout activeMenu="Dashboard">

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <div>
          <h1 className="text-xl font-semibold text-[#0f172a]">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Financial summary and activity insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Net Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanaceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransactions
            transactions={
              dashboardData?.last30DaysExpenses?.transactions || []
            }
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={
              dashboardData?.last30DaysExpenses?.transactions || []
            }
          />

          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={
              dashboardData?.last60DaysIncome?.transactions || []
            }
            onSeeMore={() => navigate("/income")}
          />

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Home