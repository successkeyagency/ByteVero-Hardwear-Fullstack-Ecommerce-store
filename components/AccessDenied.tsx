"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Logo from "./Logo";

const AccessDenied = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string;
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-6">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl rounded-2xl text-white">
        <CardHeader className="text-center">
          <div className="mb-2">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-white/80 mb-6">{details}</p>

          <SignInButton mode="modal">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-md font-semibold">
              Sign In
            </Button>
          </SignInButton>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-3">
          <p className="text-sm text-white/70">Don&apos;t have an account?</p>
          <SignUpButton mode="modal">
            <Button
              variant="outline"
              className="w-full border-white/20 text-black hover:border-orange-500"
            >
              Create an Account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccessDenied;
