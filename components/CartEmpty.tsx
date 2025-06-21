import React from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <ShoppingCart className="w-16 h-16 text-muted-foreground" />
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      <p className="text-muted-foreground">
        Looks like you haven’t added anything to your cart yet.
      </p>
      <Button asChild>
        <Link href="/shop">
          Continue Shopping
        </Link>
      </Button>
    </div>
  )
}

export default CartEmpty
