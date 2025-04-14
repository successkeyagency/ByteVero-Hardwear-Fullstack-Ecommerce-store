import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

const LikedButton = () => {
  return (
    <Link
      href="/liked"
      className="relative group transition-all duration-200 ease-in-out"
    >
      <Heart className="w-6 h-6 text-white group-hover:text-orange-400 group-hover:animate-bounce transition-colors duration-200" />
      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-md transform transition-transform duration-300 group-hover:scale-110">
        0
      </span>
    </Link>
  );
};

export default LikedButton;

