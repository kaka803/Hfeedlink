'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-purple-600 shadow-md sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-white tracking-wide">
        HFeedLink
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton signInFallbackRedirectUrl="/dashboard" >
            <Button className="bg-white hover:bg-purple-500 text-purple-600 font-semibold px-5 py-2 rounded-full shadow-md transition">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton signUpFallbackRedirectUrl="/dashboard" >
            <Button className="bg-white hover:bg-purple-500 text-purple-600 font-semibold px-5 py-2 rounded-full shadow-md transition">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
