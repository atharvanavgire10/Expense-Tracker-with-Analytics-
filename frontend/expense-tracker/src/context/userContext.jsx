import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    const updateUser = (userData) => {
        setUser(userData)
    }

    const clearUser = () => {
        setUser(null)
    }

    // ✅ Restore user on reload
    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            axiosInstance
                .get(API_PATHS.AUTH.GET_USER_INFO)
                .then((res) => {
                    setUser(res.data)
                })
                .catch(() => {
                    setUser(null)
                })
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider