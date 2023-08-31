// src/components/ThankYouPage.js
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ThankYouPage = () => {
  const [countdown, setCountdown] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1)
      } else {
        clearInterval(countdownTimer)
        navigate('/welcome')
      }
    }, 1000)

    return () => clearTimeout(countdownTimer)
  }, [countdown, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="animate-jump animate-infinite animate-duration-[2000ms] animate-ease-out text-6xl mb-4 uppercase font-bold text-white">
        ¡Gracias por tu mensaje!
      </h2>
      <h2 className="text-2xl text-white">Volviendo a inicio</h2>
      <h2 className="text-2xl text-white">{countdown}</h2>
    </div>
  )
}

export default ThankYouPage
