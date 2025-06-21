import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types'
import { Heart } from 'lucide-react';
import React from 'react'

const WishListAdd = ({
    product,
    className,
}: {
    product: Product;
    className?: string;
}) => {
  return (
    <div className={cn()}>
      <p>hi there</p>
        <button className=''>
            <Heart size={15}/>
        </button>
    </div>
  )
}

export default WishListAdd