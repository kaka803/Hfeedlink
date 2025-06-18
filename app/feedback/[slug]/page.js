'use client'

import { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { use } from 'react'

export default  function Page({ params }) {
  const { slug } =  use(params)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [SuggestedMessage, setSuggestedMessage] = useState([])
  const [loading, setloading] = useState(false)
  const handleSubmit = async () => {
    setSubmitted(true)
    if (feedback.trim() === '') {
      alert('Please enter your feedback before submitting.')
      return
    }
    const res = await fetch('/api/send-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({feedback, id: slug }), 
    })
    const data = await res.json()
    setSubmitted(false)
    alert(data.message)
    setFeedback('')
  }
  const seggestmessage = async () => {
    setloading(true)
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Give me 3 short, helpful, and realistic feedback suggestions that a user might give for any digital product (like a website or app). Use simple, casual language and separate each suggestion using ||.',
      }),
    })
    if (!res.ok) {
      console.error('Failed to fetch suggestions:', res.statusText)
      return
    }
    console.log('Suggestions fetched successfully')
    const data = await res.json()
    console.log(data);
    setSuggestedMessage(parseFeedback(data.output))
    setloading(false)
  }
  useEffect(() => {
    seggestmessage()
  }, [])

  function parseFeedback(text) {
  // Remove extra spaces and split by '||'
  return text.split("||").map(item => item.trim()).filter(Boolean);
}
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-700 to-purple-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">We Value Your Feedback 💬</h1>
        <p className="text-purple-200 text-sm">
          Help us improve by sharing your thoughts or suggestions.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl space-y-6">
          <Textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[140px] bg-purple-100 placeholder-purple-500 focus-visible:ring-purple-600 text-purple-900"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
            
              onClick={handleSubmit}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold"
            >
              {submitted ? 'Sending...' : 'Send Feedback'}
            </Button>

            
          </div>

          {submitted && (
            <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              Thank you for your feedback!
            </div>
          )}
        </div>
      </div>

      {/* Suggested Feedback Section */}
      <div className="w-full bg-gradient-to-br from-purple-700 to-purple-900 py-16 px-4">
        
        <h2 className="text-2xl font-semibold text-center text-white mb-8">
          Suggested Feedback Messages 💡
        </h2>
        <div className='w-full justify-center items-center flex mb-9'>
        <Button 
        onClick={() => seggestmessage()}
              variant="outline"
              className="min-w-1/2 border-purple-300 text-purple-700 hover:bg-purple-50 transition-all duration-500"
            >
              {loading ? 'loading...' : 'Suggest Feedback Using Ai '}
            </Button>
            </div>
           
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {
            SuggestedMessage.map((text) => {
              return <div key={text} className="bg-white bg-opacity-10 rounded-xl p-5 text-purple-900 shadow-lg hover:bg-opacity-20 transition">
            {text}
          </div>
            })
          }
          
         
        </div>
      </div>
    </div>
  )
}
