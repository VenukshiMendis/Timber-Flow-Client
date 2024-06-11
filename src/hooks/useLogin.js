import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const roleRedirects = {
    citizen: '/citizen',
    gramasewaka: '/gramasewaka',
    divisionalsecretary :'/divisionalsecretary',
    default: '/',
  }

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    console.log("login request made",username,password)
    const response = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    })
    const json = await response.json()
    const userRole = json.userRole;
    console.log(json);

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log(response);
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN',  payload: { ...json, role:  userRole} })

      // update loading state
      setIsLoading(false)

      // Redirect users based on their role or use default
      navigate(roleRedirects[userRole] || roleRedirects.default)
    }
  }

  return { login, isLoading, error }
}