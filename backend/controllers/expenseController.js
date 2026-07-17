const xlsx = require("xlsx")
const Expense = require('../models/Expense')

exports.addExpense = async (req, res) => {
    
  const userId = req.user._id  

  try {
    const { icon, category, amount, date } = req.body

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const newExpense = new Expense({
      userId,   
      icon,
      category,
      amount,
      date: new Date(date)
    })

    await newExpense.save()
    res.status(200).json(newExpense)

  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

exports.getAllExpense = async (req , res) => {
    try {
        const userId = req.user?._id

        if (!userId) {
            return res.status(401).json({ message: "User not authorized" })
        }

        const expense = await Expense.find({ userId }).sort({ date: -1 })

        res.status(200).json(expense)

    } catch (error) {
        console.error("GET EXPENSE ERROR:", error)   // 👈 ADD THIS
        res.status(500).json({ message: error.message })
    }
}

exports.deleteExpense = async (req , res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({ message: "Expense deleted successfully" })
    }catch(error){
        res.status(500).json({ message: "Server Error"})
    }
}

exports.downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user._id

    const expense = await Expense.find({ userId }).sort({ date: -1 })

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }))

    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(data)

    xlsx.utils.book_append_sheet(wb, ws, "Expense")

    // 👇 generate buffer instead of writing file
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" })

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    )

    res.send(buffer)

  } catch (error) {
    console.error("DOWNLOAD EXPENSE ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}