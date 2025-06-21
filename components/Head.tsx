import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import Search from "./Search";
import Cartlogo from "./Cartlogo";
import LikedButton from "./LikedButton";
import LogIn from "./LogIn";
import MobileHeadMenu from "./MobileHeadMenu";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { Logs } from "lucide-react";
import Link from "next/link";
import { getMyOrders } from "@/sanity/queries";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }
  return (
    <header className="bg-neutral-900 py-4 border-b border-white/20 text-amber-50">
      <Container className="relative flex items-center justify-between">
        <div className="flex md:hidden items-center gap-3">
          <MobileHeadMenu />
        </div>

        <div className="block md:hidden mx-auto">
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <HeaderMenu />
        </div>

        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <Logo />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Search />
            </div>
            <Cartlogo />
            <LikedButton />
          </div>

          <ClerkLoaded>
            <SignedIn>
              <div className="relative flex items-center gap-4">
                <Link href="/orders" className="relative group">
                  <Logs className="w-5 h-5 text-white group-hover:text-amber-400 transition" />
                  <span className="absolute -top-2 -right-3 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full shadow">
                    {orders?.length || 0}
                  </span>
                </Link>
                <UserButton />
              </div>
            </SignedIn>
            {!user && <LogIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
