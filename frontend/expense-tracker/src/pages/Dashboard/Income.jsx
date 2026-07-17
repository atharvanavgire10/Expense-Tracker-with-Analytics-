import React, { useState, useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import IncomeOverview from "../../components/Income/IncomeOverview"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import Modal from "../../components/Modal"
import AddIncomeForm from "../../components/Income/AddIncomeForm"
import IncomeList from "../../components/Income/IncomeList"
import DeleteAlert from "../../components/DeleteAlert"
import { useUserAuth } from "../../hooks/useUserAuth"
import toast from "react-hot-toast"

const Income = () => {
  useUserAuth()

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)

  const [openDeleteAlert, setopenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  const fetchIncomeDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.GET_ALL_INCOME
      )

      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("Error fetching income data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income

    if (!source?.trim()) {
      toast.error("Income source is required.")
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be greater than 0.")
      return
    }

    if (!date) {
      toast.error("Date is required.")
      return
    }

    try {
      const response = await axiosInstance.post(
        API_PATHS.INCOME.ADD_INCOME,
        { source, amount, date, icon }
      )

      setIncomeData((prev) => [response.data, ...prev])
      setOpenAddIncomeModal(false)
      toast.success("Income added successfully.")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add income."
      )
    }
  }

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(id)
      )

      setopenDeleteAlert({ show: false, data: null })
      toast.success("Income deleted successfully.")
      fetchIncomeDetails()
    } catch (error) {
      toast.error("Failed to delete income.")
    }
  }

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      )

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")

      link.href = url
      link.download = "income_records.xlsx"

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      toast.error("Failed to download income records.")
    }
  }

  useEffect(() => {
    fetchIncomeDetails()
  }, [])

  return (
    <DashboardLayout activeMenu="Income">

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <div>
          <h1 className="text-xl font-semibold text-[#0f172a]">
            Income Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your income records.
          </p>
        </div>

        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />

        <IncomeList
          transactions={incomeData}
          onDelete={(id) =>
            setopenDeleteAlert({ show: true, data: id })
          }
          onDownload={handleDownloadIncomeDetails}
        />

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setopenDeleteAlert({ show: false, data: null })
          }
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income record?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>

      </div>

    </DashboardLayout>
  )
}

export default Income