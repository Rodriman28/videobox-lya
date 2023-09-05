// src/components/WelcomePage.js
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import by from '../../../../resources/by.svg'
import audiologo2 from '../../../../resources/audiologo2.mp4'

const WelcomePage = () => {
  const navigate = useNavigate()

  const startRecording = () => {
    navigate('/countdown')
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '5') {
        startRecording()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="flex flex-col items-center pt-10 h-screen text-white">
      <div className="flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          width={'75%'}
          className="rounded-lg shadow-slate-600 shadow-[0px_1px_30px_10px_#fff]"
        >
          <source src={audiologo2} type="video/mp4"></source>
        </video>
      </div>
      <p className="animate-pulse animate-infinite animate-duration-[3000ms] animate-ease-in text-3xl lg:text-5xl font-bold pt-10 lg:pt-16">
        ¡Presiona el botón para grabar tu mensaje!
      </p>

      <div className="flex items-center absolute bottom-2 text-white font-medium">
        <img src={by} width="70em" alt="Creative Commons logo" className="mx-2 rounded-md" />
        <p className="text-xs lg:text-sm">
          VIDEOBOX by Rodrigo Romero - MagicSoft is licensed under a Attribution 4.0 International
          (CC BY 4.0)
        </p>
      </div>
    </div>
  )
}

export default WelcomePage
