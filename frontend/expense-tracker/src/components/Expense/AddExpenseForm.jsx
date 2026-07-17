import React, { useState } from "react"
import Input from "../Inputs/Input"
import EmojiPickerPopup from "../EmojiPickerPopup"

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: ""
  })

  const handleChange = (key, value) =>
    setExpense({ ...expense, [key]: value })

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md space-y-6">

      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) =>
            handleChange("icon", selectedIcon)
          }
        />
      </div>

      <div className="space-y-5">
        <Input
          value={expense.category}
          onChange={({ target }) =>
            handleChange("category", target.value)
          }
          label="Expense Category"
          placeholder="e.g., Rent, Utilities"
          type="text"
        />

        <Input
          value={expense.amount}
          onChange={({ target }) =>
            handleChange("amount", target.value)
          }
          label="Amount"
          placeholder="Enter amount"
          type="number"
        />

        <Input
          value={expense.date}
          onChange={({ target }) =>
            handleChange("date", target.value)
          }
          label="Transaction Date"
          type="date"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>

    </div>
  )
}

export default AddExpenseForm