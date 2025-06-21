import { SignInButton } from '@clerk/nextjs'
import { LogInIcon } from 'lucide-react'
import React from 'react'

const LogIn = () => {
  return (
    <SignInButton mode='modal'>
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 shadow-md cursor-pointer">
        <LogInIcon className="w-4 h-4" />
        <span className="hidden md:inline">LogIn</span>
      </button>
    </SignInButton>

  )

}

export default LogIn