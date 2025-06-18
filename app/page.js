'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from './componets/navbar';

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 text-white font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
          Create Your Personal Feedback Link
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-8 text-white/80">
          With <span className="font-semibold text-yellow-300">HFeedLink</span>, get honest feedback through a unique link made just for you. Build trust. Improve yourself. All in one place.
        </p>
        <Link href={"/dashboard"} className="inline-block">
        <Button className="text-lg px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold transition shadow-lg">
          Get Started
        </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white text-center text-purple-900">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">Why HFeedLink?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-3 text-purple-800">Create Your Link</h3>
            <p className="text-purple-700">Create a personalized link to collect feedback from friends, followers, or clients.</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-3 text-purple-800">Receive Honest Reviews</h3>
            <p className="text-purple-700">Get genuine opinions and suggestions anonymously or with identity – your choice.</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-3 text-purple-800">Improve Continuously</h3>
            <p className="text-purple-700">Use the feedback to grow, improve your service, or simply reflect better.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-white/80 text-sm">
        © {new Date().getFullYear()} HFeedLink. Built by Hassnain.
      </footer>
    </main>
    </>
  );
}
