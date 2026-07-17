import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from "../../components/Inputs/Input"
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from "../../utils/apiPaths"
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'





const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)


  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!fullName) {
      setError("Please enter your name.")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    //Sign Api Calling

    try{

      let profileImageUrl = ""
      // Upload image 

      if (profilePic){
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ""
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl,
      })
      const { token, user} = response.data
      if(token){
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    }catch (error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">

        <h3 className="text-2xl font-semibold text-[#0f172a] text-center">
          Open New Account
        </h3>

        <p className="text-sm text-gray-500 mt-2 mb-8 text-center">
          Create your secure banking profile
        </p>

        <form onSubmit={handleSignUp} className="space-y-6">

          <div className="flex justify-center">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Full legal name"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="name@mail.com"
              type="text"
            />

            <div className="md:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Create secure password"
                type="password"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-xs">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#0f172a] text-white font-medium hover:bg-[#1e293b] transition"
          >
            Create Secure Account
          </button>

          <p className="text-sm text-center text-gray-600">
            Already registered?{" "}
            <Link className="font-medium text-[#0f172a] underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
