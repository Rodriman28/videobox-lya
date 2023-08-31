import { useEffect } from 'react'
import logo from '../../../../resources/logo.svg'
import { useNavigate } from 'react-router-dom'
import by from '../../../../resources/by.svg'

export default function Tutorial() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '5') {
        navigate('/welcome')
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="flex flex-col items-center pt-10 h-screen text-white">
      <img src={logo} alt="Logo de LYA Studio" width={'35%'} className="pb-4" />
      <h1 className="lg:text-5xl text-4xl mb-4 pb-4 uppercase text-black">VideoBox</h1>

      <p className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 lg:mt-10 mb-2">Guia de uso</p>
      <ul className="flex flex-col gap-6 pt-5 lg:text-2xl text-xl">
        <li>
          <p>
            Presione <span className="bg-black px-2 py-1 rounded-md">F11</span> para salir de
            pantalla completa
          </p>
        </li>
        <li>
          <p>
            Para iniciar la grabacion se debe presionar el botón rojo (en el teclado el{' '}
            <span className="bg-black px-4 py-1 rounded-md">5</span> )
          </p>
        </li>
        <li>
          <p>
            Los videos se guardan con formato{' '}
            <span className="bg-black px-4 py-1 rounded-md">DD-MM-YYYY_HH-mm-ss.mp4</span>
          </p>
        </li>
      </ul>
      <p className="animate-pulse animate-infinite animate-duration-[3000ms] animate-ease-in text-2xl md:text-3xl lg:text-4xl font-bold pt-10 lg:pt-15">
        Para iniciar la aplicación presione el boton de grabar
      </p>
      <div className="flex items-center absolute bottom-2 text-black font-medium">
        <img src={by} width="70em" alt="Creative Commons logo" className="mx-2 rounded-md" />
        <p className="text-xs ">
          VIDEOBOX by Rodrigo Romero - MagicSoft is licensed under a Attribution 4.0 International
          (CC BY 4.0)
        </p>
      </div>
    </div>
  )
}
