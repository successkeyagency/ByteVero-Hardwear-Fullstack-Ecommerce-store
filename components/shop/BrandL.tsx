import { BRANDS_QUERYResult } from '@/sanity.types';
import React from 'react'
import Title from '../Title';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandL = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
   <div className="border-b pb-4">
  <Title className="text-lg font-semibold mb-2">Brands</Title>
  <RadioGroup value={selectedBrand || ""} className="space-y-2">
    {brands?.map((brand) => (
      <div
        key={brand?._id}
        onClick={() => setSelectedBrand(brand?.slug?.current as string)}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <RadioGroupItem value={brand?.slug?.current as string} id={brand?.slug?.current} />
        <Label
          htmlFor={brand?.slug?.current}
          className={`cursor-pointer ${
            selectedBrand === brand?.slug?.current
              ? "font-semibold text-green-700"
              : "text-gray-700"
          }`}
        >
          {brand?.title}
        </Label>
      </div>
    ))}
  </RadioGroup>
  {selectedBrand && (
    <button
      onClick={() => setSelectedBrand(null)}
      className="mt-2 text-sm text-red-600 hover:underline"
    >
      Reset selection
    </button>
  )}
</div>

  );
};

export default BrandL