// src/components/ThankYouPage.js
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import audiologo from '../../../../resources/audiologo.mp4'

const ThankYouPage = () => {
  const [countdown, setCountdown] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    if (countdown === 0) {
      navigate('/welcome')
    }
  }, [navigate, countdown])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <video autoPlay loop={true} width={'70%'}>
        <source src={audiologo} />
      </video>
      <h2 className="animate-jump animate-infinite animate-duration-[2000ms] animate-ease-out text-4xl lg:text-6xl mb-4 uppercase font-bold text-white">
        ¡Gracias por tu mensaje!
      </h2>
      <h2 className="text-2xl text-white">Volviendo a inicio</h2>
      <h2 className="text-2xl text-white">{countdown}</h2>
    </div>
  )
}

export default ThankYouPage
