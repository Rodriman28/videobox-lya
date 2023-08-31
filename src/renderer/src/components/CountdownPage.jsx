// src/components/CountdownPage.js
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CountdownPage = () => {
  const [countdown, setCountdown] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1)
      } else {
        clearInterval(timer)
        navigate('/recording')
      }
    }, 950)

    return () => clearInterval(timer)
  }, [countdown, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-9xl mb-4 animate-ping animate-once animate-duration-1000 animate-ease-in font-bold text-white">
        {countdown}
      </h2>
    </div>
  )
}

export default CountdownPage
