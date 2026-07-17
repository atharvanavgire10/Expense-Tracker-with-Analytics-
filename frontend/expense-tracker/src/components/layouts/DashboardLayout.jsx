import React, { useContext } from "react"
import { UserContext } from "../../context/userContext"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext)

  if (user === undefined) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="transition-all duration-300 ease-in-out">
        <Navbar activeMenu={activeMenu} />
      </div>

      {user && (
        <div className="flex">

          <div className="max-[1080px]:hidden transition-all duration-300 ease-in-out">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div
  className="
    grow px-6 py-6
    transition-all duration-300 ease-in-out
    opacity-0 animate-fadeInUp
  "
>
  {children}
</div>

        </div>
      )}
    </div>
  )
}

export default DashboardLayout