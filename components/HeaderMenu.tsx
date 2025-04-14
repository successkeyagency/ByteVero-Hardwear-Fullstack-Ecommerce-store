"use client";

import { headerData } from "@/constants/data";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex w-1/3 items-center justify-start gap-8 text-base font-semibold text-white">
      {headerData?.map((item) => {
        const isActive = pathname === item?.href;

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "relative transition duration-200 group",
              isActive ? "text-amber-400 animate-bounce" : "hover:text-orange-400"
            )}
          >
            {item.title}
            <span
              className={cn(
                "absolute left-1/2 bottom-0 h-0.5 bg-orange-400 transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full",
                isActive ? "w-full left-0" : "w-0"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderMenu;
