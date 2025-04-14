import React from 'react'
import Container from './Container'
import logo from '../assets/Bytevero.jpg'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import Search from './Search'
import Cartlogo from './Cartlogo'
import LikedButton from './LikedButton'
import LogIn from './LogIn'
import MobileHeadMenu from './MobileHeadMenu'

const Header = () => {
  return (
    <header className='bg-black py-5 border-b border-b-white/20 text-amber-50'>
        <Container className="flex items-center justify-between text-lightcolor">
            <HeaderMenu />
            <div className='w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0' >
                <MobileHeadMenu />
                <Logo />
            </div>
            <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
                <Search />
                <Cartlogo />
                <LikedButton />
                <LogIn />
            </div>
        </Container>
    </header>
  )
}

export default Header