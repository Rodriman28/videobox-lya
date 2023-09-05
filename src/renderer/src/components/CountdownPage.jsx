// src/components/CountdownPage.js
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import filmreel from '../../../../resources/filmreel.mp4'

const CountdownPage = () => {
  const [countdown, setCountdown] = useState(9)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    if (countdown === 0) {
      navigate('/recording')
    }
  }, [navigate, countdown])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <video autoPlay width={'70%'}>
        <source src={filmreel} />
      </video>
      {/* <h2 className="lg:text-9xl text-8xl mb-4 animate-ping animate-once animate-duration-1000 animate-ease-in font-bold text-white">
        {countdown}
      </h2> */}
      <p className="text-white bg-clip-text text-xl lg:text-3xl font-bold">
        Graba hasta 1 minuto de video o
      </p>
      <p className="text-white bg-clip-text text-xl lg:text-3xl font-bold">
        puedes finalizar el mensaje presionando el botón
      </p>
    </div>
  )
}

export default CountdownPage
