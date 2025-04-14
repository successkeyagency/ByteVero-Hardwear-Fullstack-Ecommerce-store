"use client"
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import MobileSideMenu from './MobileSideMenu'

const MobileHeadMenu = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return ( 
    <>
        <button onClick={()=> setIsSidebarOpen(!isSidebarOpen)}>
            <AlignLeft  className='hover:text-black hoverEffect md:hidden hover:cursor-pointer'/>
        </button>
        <div className='md:hidden'>
            <MobileSideMenu  
            isOpen={isSidebarOpen} 
            onClose={()=> setIsSidebarOpen(false)}/>
        </div>
        
    </>
    );
};

export default MobileHeadMenu;