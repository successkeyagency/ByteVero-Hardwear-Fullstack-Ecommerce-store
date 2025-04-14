import React, { FC } from "react";
import Logo from "./Logo";
import { X, Github, Linkedin } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSideMenu: FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-black via-black/90 to-zinc-900 transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        ref={sidebarRef}
        className="min-w-72 max-w-96 h-full bg-black border-r border-orange-500 shadow-2xl flex flex-col justify-between p-6 md:p-10 relative z-50"
      >
        <div className="flex items-center justify-between mb-8">
          <Logo className="text-white scale-110" />
          <button
            onClick={onClose}
            className="hover:text-orange-400 transition duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-5 text-base font-semibold tracking-wide">
          {headerData.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={`relative text-white hover:text-orange-400 transition duration-200 ${
                pathname === item.href ? "text-orange-500" : ""
              }`}
            >
              <span className="relative z-10">{item.title}</span>
              <span className="absolute inset-0 w-0 h-full bg-orange-400/10 rounded transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/70">
          <p>
            Made by{" "}
            <Link
              href="https://successkeyagency.com"
              target="_blank"
              className="text-orange-400 font-semibold hover:underline"
            >
              SuccessKeyAgency LLC
            </Link>
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <Link href="https://github.com/yourusername" target="_blank">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-orange-400 transition duration-200"
              >
                <Github className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/yourprofile" target="_blank">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-orange-400 transition duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSideMenu;
