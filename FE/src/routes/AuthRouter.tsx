import AuthLayout from '@/layouts/AuthLayout'
import SignInPage from '@/pages/auth/Signin'
import SignupPage from '@/pages/auth/Signup'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AuthRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='signup' element={<SignupPage />} />
            <Route path='signin' element={<SignInPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AuthRouter
