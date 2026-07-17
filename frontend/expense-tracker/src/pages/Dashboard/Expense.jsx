import React, { useEffect, useState } from "react"
import { useUserAuth } from "../../hooks/useUserAuth"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import toast from "react-hot-toast"
import ExpenseOverview from "../../components/Expense/ExpenseOverview"
import AddExpenseForm from "../../components/Expense/AddExpenseForm"
import Modal from "../../components/Modal"
import ExpenseList from "../../components/Expense/ExpenseList"
import DeleteAlert from "../../components/DeleteAlert"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

const Expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)

  const [openDeleteAlert, setopenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  const fetchExpenseDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      )
      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("Error fetching expenses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense

    if (!category?.trim()) {
      toast.error("Category is required.")
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
        API_PATHS.EXPENSE.ADD_EXPENSE,
        { category, amount, date, icon }
      )

      setExpenseData((prev) => [response.data, ...prev])
      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully.")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add expense"
      )
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      )

      setopenDeleteAlert({ show: false, data: null })
      toast.success("Expense deleted successfully.")
      fetchExpenseDetails()
    } catch (error) {
      toast.error("Failed to delete expense.")
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" }
      )

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")

      link.href = url
      link.download = "expense_records.xlsx"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      toast.error("Failed to download expense records.")
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
  }, [])

  return (
    <DashboardLayout activeMenu="Expense">

<div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl font-semibold text-[#0f172a]">
            Expense Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and analyze your expense records.
          </p>
        </div>

        <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
        />

        <ExpenseList
          transactions={expenseData}
          onDelete={(id) =>
            setopenDeleteAlert({ show: true, data: id })
          }
          onDownload={handleDownloadExpenseDetails}
        />

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setopenDeleteAlert({ show: false, data: null })
          }
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense record?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>

      </div>

    </DashboardLayout>
  )
}

export default Expense