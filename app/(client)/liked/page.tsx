import AccessDenied from '@/components/AccessDenied';
import WishLP from '@/components/WishLP';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const liked = async() => {
    const user = await currentUser();
  return (
     <>
      {user ? (
       <WishLP />
      ) : (
        <AccessDenied details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </>
  )
}

export default liked;