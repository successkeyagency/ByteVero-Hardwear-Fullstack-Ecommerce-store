import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormat = ({ amount, className }: Props) => {
  if (typeof amount !== "number") return null;

  const formattedPrice = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <span className={twMerge("text-sm font-semibold text-darkColor truncate max-w-full block", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormat;
