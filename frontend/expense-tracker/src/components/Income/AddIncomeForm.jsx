import React, { useState } from "react"
import Input from "../Inputs/Input"
import EmojiPickerPopup from "../EmojiPickerPopup"

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: ""
  })

  const handleChange = (key, value) =>
    setIncome({ ...income, [key]: value })

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md space-y-6">

      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) =>
            handleChange("icon", selectedIcon)
          }
        />
      </div>

      <div className="space-y-5">
        <Input
          value={income.source}
          onChange={({ target }) =>
            handleChange("source", target.value)
          }
          label="Income Source"
          placeholder="e.g., Salary, Freelance"
          type="text"
        />

        <Input
          value={income.amount}
          onChange={({ target }) =>
            handleChange("amount", target.value)
          }
          label="Amount"
          placeholder="Enter amount"
          type="number"
        />

        <Input
          value={income.date}
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
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>

    </div>
  )
}

export default AddIncomeForm