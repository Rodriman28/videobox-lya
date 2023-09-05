// src/components/ThankYouPage.js
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import audiologofinal from '../../../../resources/audiologo-final.mp4'

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
      <video
        autoPlay
        loop={true}
        width={'75%'}
        className="rounded-lg shadow-slate-600 shadow-[0px_1px_30px_10px_#fff]"
      >
        <source src={audiologofinal} />
      </video>
      <h2 className="text-2xl text-white pt-5">Volviendo a inicio</h2>
      <h2 className="text-2xl text-white">{countdown}</h2>
    </div>
  )
}

export default ThankYouPage
