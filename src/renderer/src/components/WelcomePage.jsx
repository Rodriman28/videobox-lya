// src/components/WelcomePage.js
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../../resources/logo.svg'
import { ipcRenderer } from 'electron'
import by from '../../../../resources/by.svg'

const WelcomePage = () => {
  const navigate = useNavigate()

  const startRecording = () => {
    navigate('/countdown')
  }

  const date = new Date()
  const folderName = date.toLocaleDateString('es-UY', { timeZone: 'America/Montevideo' }).split('/')

  // Evento para crear carpeta a travez del main

  // useEffect(() => {
  //   ipcRenderer.send('create-folder', {
  //     carpeta: `D:/${folderName[0]}-${folderName[1]}-${folderName[2]}`
  //   })
  // }, [])

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
      <img src={logo} alt="Logo de LYA Studio" width={'40%'} className="pb-4" />
      <h1 className="text-6xl pb-16 uppercase text-black">VideoBox</h1>
      <p className="text-black text-xl lg:text-3xl font-bold pb-5">
        ¡Graba un video de hasta 1 minuto para tus seres queridos!
      </p>
      <p className="text-black text-xl lg:text-3xl font-bold pb-5">
        Puedes finalizar el mensaje antes volviendo a presionar el botón.
      </p>
      <p className="animate-pulse animate-infinite animate-duration-[3000ms] animate-ease-in text-2xl lg:text-4xl font-bold pt-5">
        ¡Presiona el botón rojo para comenzar a grabar tu mensaje!
      </p>
      <div className="flex items-center absolute bottom-2 text-black font-medium">
        <img src={by} width="70em" alt="Creative Commons logo" className="mx-2 rounded-md" />
        <p className="text-xs">
          VIDEOBOX by Rodrigo Romero - MagicSoft is licensed under a Attribution 4.0 International
          (CC BY 4.0)
        </p>
      </div>
    </div>
  )
}

export default WelcomePage
