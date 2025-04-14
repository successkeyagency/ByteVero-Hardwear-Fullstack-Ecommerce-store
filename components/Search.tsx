'use client'

import React from 'react'
import { Search } from 'lucide-react'

const SearchButton = () => {
  return (
    <div className="cursor-pointer group">
      <Search className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-orange-400 hoverEffect" />
    </div>
  )
}

export default SearchButton
