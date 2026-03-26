'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  username: string
  country?: string
  bio?: string
  profile_image_url?: string
  phone?: string
  dob?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signin: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  signout: () => Promise<void>
  refreshUser: () => Promise<void>
  signinWithGoogle: () => void
  signinWithApple: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ✅ Run only once safely
  useEffect(() => {
    let isMounted = true

    const init = async () => {
      await refreshUser()
      if (isMounted) setIsLoading(false)
    }

    init()

    return () => {
      isMounted = false
    }
  }, [])

  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me')

      if (!res.ok) {
        setUser(null)
        return
      }

      const data = await res.json()

      if (data?.success) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
      setUser(null)
    }
  }

  const signin = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!data?.success) {
        throw new Error(data?.message || 'Sign in failed')
      }

      setUser(data.user)
    } catch (error: any) {
      throw new Error(error.message || 'Sign in failed')
    }
  }

  const signup = async (username: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await res.json()

      if (!data?.success) {
        throw new Error(data?.message || 'Sign up failed')
      }

      setUser(data.user)
    } catch (error: any) {
      throw new Error(error.message || 'Sign up failed')
    }
  }

  const signout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      const data = await res.json()

      if (!data?.success) {
        throw new Error(data?.message || 'Sign out failed')
      }

      setUser(null)
    } catch (error: any) {
      throw new Error(error.message || 'Sign out failed')
    }
  }

  // ✅ Google OAuth
  const signinWithGoogle = () => {
    window.location.href = '/api/auth/google'
  }

  // ✅ Apple OAuth
  const signinWithApple = () => {
    window.location.href = '/api/auth/apple'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signin,
        signup,
        signout,
        refreshUser,
        signinWithGoogle,
        signinWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}