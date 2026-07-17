import React, { useContext } from "react"
import { SIDE_MENU_DATA } from "../../utils/data"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import CharAvatar from "../../components/Cards/CharAvatar"

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout()
      return
    }
    navigate(route)
  }

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate("/login")
  }

  return (
    <div className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 p-6 sticky top-[64px] z-20 flex flex-col">

      <div className="flex flex-col items-center gap-4 mb-8">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-24"
            height="h-24"
            style="text-lg"
          />
        )}

        <h5 className="text-sm font-semibold text-[#0f172a] text-center">
          {user?.fullName || ""}
        </h5>
      </div>

      <div className="flex flex-col gap-1">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`
                w-full flex items-center gap-3
                px-4 py-2.5 rounded-md text-sm font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "bg-[#0f172a] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <item.icon className="text-base" />
              {item.label}
            </button>
          )
        })}
      </div>

    </div>
  )
}

export default SideMenu