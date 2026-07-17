import React from "react"
import card from "../../assets/images/chart.png"
import { LuTrendingUpDown } from "react-icons/lu"

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#0f172a]">

      {/* LEFT SIDE */}
      <div className="w-full md:w-[55vw] flex items-center justify-center px-6 md:px-16 py-12 bg-white">

        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#0f172a] text-center tracking-tight mb-8">
            Secure Expense Portal
          </h2>

          {children}
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-[45vw] bg-[#0f172a] text-white p-14 border-l border-[#1e293b]">

        <div className="flex flex-col justify-between w-full">

          <div>
            <h3 className="text-3xl font-semibold text-white leading-tight">
              Enterprise Financial Control
            </h3>

            <p className="text-slate-400 text-sm mt-4 leading-relaxed max-w-md">
              Monitor revenue streams, manage operational expenses, and maintain complete financial visibility with secure, enterprise-grade reporting.
            </p>
          </div>

          <div className="mt-12">
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label="Managed Transaction Volume"
              value="₹ 430,000"
            />
          </div>

          <img
            src={card}
            alt="financial overview"
            className="w-72 mt-12 opacity-90"
          />

        </div>
      </div>
    </div>
  )
}

export default AuthLayout


const StatsInfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex gap-4 bg-[#1e293b] p-6 rounded-lg border border-[#334155] shadow-sm">

      <div className="w-11 h-11 flex items-center justify-center text-lg rounded-md bg-[#bfa14a] text-[#0f172a]">
        {icon}
      </div>

      <div>
        <h6 className="text-xs text-slate-400 mb-1 tracking-wide">
          {label}
        </h6>
        <span className="text-lg font-semibold text-white">
          {value}
        </span>
      </div>

    </div>
  )
}