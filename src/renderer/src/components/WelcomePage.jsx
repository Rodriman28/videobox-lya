// src/components/WelcomePage.js
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../../resources/logo.svg'
import { ipcRenderer } from 'electron'

const WelcomePage = () => {
  const navigate = useNavigate()

  const startRecording = () => {
    navigate('/countdown')
  }

  useEffect(() => {
    ipcRenderer.send('create-folder', { carpeta: 'C:/videos-lya' })
  }, [])

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
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <img src={logo} alt="Logo de LYA Studio" width={'600em'} className="pb-4" />
      <h1 className="text-4xl mb-4 pb-4 uppercase text-black">VideoBox</h1>

      <p className="animate-pulse animate-infinite animate-duration-[3000ms] animate-ease-in text-2xl font-bold">
        Presiona el botón y graba tu mensaje.
      </p>
    </div>
  )
}

export default WelcomePage
