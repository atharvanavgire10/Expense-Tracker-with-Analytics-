import React, { useState } from "react"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from "./SideMenu"

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            className="block lg:hidden text-[#0f172a] transition"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? (
              <HiOutlineX size={22} />
            ) : (
              <HiOutlineMenu size={22} />
            )}
          </button>

          <h2 className="text-base font-semibold text-[#0f172a] tracking-tight">
            Expense Management System
          </h2>
        </div>
      </div>

      <div
        className={`
          fixed inset-0 bg-black/30 z-30 transition-opacity duration-300
          ${openSideMenu ? "opacity-100 visible" : "opacity-0 invisible"}
          lg:hidden
        `}
        onClick={() => setOpenSideMenu(false)}
      />

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white z-40
          transform transition-transform duration-300 ease-in-out
          ${openSideMenu ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `}
      >
        <SideMenu activeMenu={activeMenu} />
      </div>
    </>
  )
}

export default Navbar