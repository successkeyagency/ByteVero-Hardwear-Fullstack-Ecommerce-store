import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import logo from '../assets/Bytevero-removebg-preview.png'; 

const Logo = ({className}:{className?:string}) => {
  return <Link href={"/"}>
    <h2 className={cn("text-2xl  text-white font-black tracking-wider uppercase hover:text-blue-950",className)}>Byte<span className='text-amber-500 hover:text-blue-950'>Vero</span></h2>
  </Link>;
}

export default Logo;
