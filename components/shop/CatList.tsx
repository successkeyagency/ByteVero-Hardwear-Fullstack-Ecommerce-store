import { Category } from '@/sanity.types';
import React from 'react'
import Title from '../Title';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';


interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}
const CatList = ({categories,
  selectedCategory,
  setSelectedCategory,}: Props) => {
  return (
    <div className="border-b pb-4">
  <Title className="text-lg font-semibold mb-2">Product Categories</Title>
  <RadioGroup value={selectedCategory || ""} className="space-y-2">
    {categories?.map((category) => (
      <div
        onClick={() => setSelectedCategory(category?.slug?.current as string)}
        key={category?._id}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <RadioGroupItem value={category?.slug?.current as string} id={category?.slug?.current} />
        <Label
          htmlFor={category?.slug?.current}
          className={`cursor-pointer ${
            selectedCategory === category?.slug?.current
              ? "font-semibold text-green-700"
              : "text-gray-700"
          }`}
        >
          {category?.title}
        </Label>
      </div>
    ))}
  </RadioGroup>
  {selectedCategory && (
    <button
      onClick={() => setSelectedCategory(null)}
      className="mt-2 text-sm text-red-600 hover:underline"
    >
      Reset selection
    </button>
  )}
</div>

  );
};
  


export default CatList