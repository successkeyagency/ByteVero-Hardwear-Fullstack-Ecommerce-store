import React from 'react'
import Title from '../Title';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceL = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
     <div className="">
  <Title className="text-lg font-semibold mb-2">Price</Title>
  <RadioGroup className="space-y-2" value={selectedPrice || ""}>
    {priceArray?.map((price, index) => (
      <div
        key={index}
        onClick={() => setSelectedPrice(price?.value)}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <RadioGroupItem value={price?.value} id={price?.value} />
        <Label
          htmlFor={price.value}
          className={`cursor-pointer ${
            selectedPrice === price?.value
              ? "font-semibold text-green-700"
              : "text-gray-700"
          }`}
        >
          {price?.title}
        </Label>
      </div>
    ))}
  </RadioGroup>
  {selectedPrice && (
    <button
      onClick={() => setSelectedPrice(null)}
      className="mt-2 text-sm text-red-600 hover:underline"
    >
      Reset selection
    </button>
  )}
</div>

  )
}

export default PriceL