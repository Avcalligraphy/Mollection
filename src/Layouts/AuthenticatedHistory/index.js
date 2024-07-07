import React from 'react'
import NavbarHistory from './NavbarHistory'

const AuthenticatedHistory = ({children}) => {
  return (
    <div className='mx-auto max-w-screen block'>
        <NavbarHistory />
        <main>{children}</main>
    </div>
  )
}

export default AuthenticatedHistory