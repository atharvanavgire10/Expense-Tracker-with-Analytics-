import React, { useState, useContext } from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import { useNavigate, Link } from "react-router-dom"
import Input from "../../components/Inputs/Input"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import { UserContext } from "../../context/userContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Password is required.")
      return
    }

    setError("")

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        { email, password }
      )

      const { token, user } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Authentication failed. Please try again."
      )
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">

        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-[#0f172a]">
            Sign In
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Access your financial management dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="name@company.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
          >
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600">
            New user?{" "}
            <Link
              className="font-medium text-[#0f172a] hover:underline"
              to="/signUp"
            >
              Create an account
            </Link>
          </p>

        </form>

      </div>
    </AuthLayout>
  )
}

export default Login