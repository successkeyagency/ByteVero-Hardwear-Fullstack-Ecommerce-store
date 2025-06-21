import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types';
import { Heart } from 'lucide-react';
import React from 'react';

const WishListAdd = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      <button
        className="hover:text-red-500 transition"
        aria-label={`Add ${product.name} to wishlist`}
      >
        <Heart size={18} />
      </button>
    </div>
  );
};

export default WishListAdd;
