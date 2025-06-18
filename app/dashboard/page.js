'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Copy, Calendar } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import Navbar from '../componets/navbar';
import { RefreshCw } from "lucide-react";
import Loader from '../componets/Loader';







export default function Dashboard() {
    const spanRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [feedbacks, setfeedbacks] = useState([])
  const [laoding, setlaoding] = useState(false)
  const [enabled, setEnabled] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = spanRef.current?.textContent;

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.allowFeedback !== undefined) {
      setEnabled(user.publicMetadata.allowFeedback)
    }
  }, [isLoaded, user])
const handleToggle = async (value) => {
  setEnabled(value);

  if (!user || !user.id) {
    console.error("User not loaded yet");
    return;
  }

  try {
    const res = await fetch('/api/update-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        allowFeedback: value,
        id: user.id,
      }),
    });

    const data = await res.json();
    console.log('Toggle Response:', data);
  } catch (error) {
    console.error("Toggle error:", error);
  }
};


  useEffect(() => {
    console.log(user);
    
  }, [user])
  

useEffect(() => {
    

    if (user?.id) {
      fetchFeedback();
    }
  }, [user?.id]);
useEffect(() => {
  console.log(feedbacks);
  
}, [feedbacks])
const fetchFeedback = async () => {
      try {
        setlaoding(true)
        const res = await fetch('/api/feedbackdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: user.id }), 
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setlaoding(false)
        console.log('Fetched Feedback:', data);
        setfeedbacks(data.feedback);  

      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      }
    };

function getTimeAgo(dateString) {
  const now = new Date();
  const created = new Date(dateString);
  const seconds = Math.floor((now - created) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);

    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this feedback?");
  if (!confirm) return;

  try {
    const res = await fetch('/api/delete-feedback', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setfeedbacks(prev => prev.filter(f => f._id !== id));
    } else {
      alert('Failed to delete feedback');
    }
  } catch (error) {
    console.error(error);
    alert('Error deleting feedback');
  }
};

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-purple-50 text-purple-900 font-sans px-4 pb-10">
  {/* Link Section */}
  <section className="flex flex-col items-center justify-center text-center pt-20">
    <h1 className="text-5xl font-bold mb-4">Your Personal Feedback Link</h1>
    <div className="flex flex-wrap items-center justify-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 mt-4 max-w-full">
  <span
    ref={spanRef}
    className="text-sm sm:text-base text-purple-700 font-medium break-all"
  >
    {`${process.env.NEXT_PUBLIC_HOST_URL}/feedback/${isLoaded && isSignedIn ? user.id : 'yourname'}`}
  </span>
  <button
    onClick={copyToClipboard}
    className="text-purple-600 hover:text-purple-800"
  >
    <Copy size={18} />
  </button>
</div>

    {copied && <p className="text-sm text-green-600 mt-2">Link copied!</p>}

    {/* Toggle */}
    <div className="flex items-center gap-3 mt-8">
      <span className="text-sm font-medium">Allow others to send feedback when this is turned on</span>
      <Switch checked={enabled} onCheckedChange={handleToggle} />
    </div>

    {/* Tagline */}
    <p className="mt-8 text-xl text-purple-700 font-semibold">
      Your feedback makes me better 💬
    </p>
  </section>

  {/* Feedback Section */}
  <section className="mt-16 bg-purple-300 py-10 px-6 rounded-t-3xl shadow-inner">
  {
    laoding ? (<Loader />) : (
      <div className="max-w-4xl mx-auto">
        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={fetchFeedback}
            className="flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
          >
            <RefreshCw size={16} />
            Refresh Feedback
          </button>
        </div>

        {/* Scrollable Feedback Section */}
        <div className="h-[400px] overflow-y-auto space-y-4 custom-scrollbar pr-2">
  {feedbacks.length === 0 ? (
    <p className="text-center text-purple-800">
      No feedback received yet. Share your link to start collecting feedback!
    </p>
  ) : (
    feedbacks.map((feedback, index) => (
      <div
        key={index}
        className="bg-purple-600 p-4 rounded-lg shadow hover:shadow-lg transition relative"
      >
        <button
          onClick={() => handleDelete(feedback._id)}
          className="absolute top-2 right-2 text-white hover:text-red-300 text-sm"
          title="Delete"
        >
          ✕
        </button>

        <p className="text-white">{feedback.feedback}</p>
        <div className="flex items-center justify-between mt-2 text-sm text-white">
          <span>Anonymous</span>
          <span className="flex items-center gap-1">
            {getTimeAgo(feedback.createdAt)}
          </span>
        </div>
      </div>
    ))
  )}
</div>

      </div>
    )
  }
</section>

</main>

    </>
  );
}
