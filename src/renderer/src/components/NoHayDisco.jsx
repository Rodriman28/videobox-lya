import { ipcRenderer } from 'electron'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NoHayDisco() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '5') {
        ipcRenderer.invoke('search-disk').then((result) => {
          if (result) navigate('/no-disk')
          if (!result) navigate('/')
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center pt-10 h-screen text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-32 lg:w-40 mb-5 lg:mb-10 text-yellow-500 animate-pulse animate-infinite animate-duration-[3000ms] animate-ease-in"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>

      <h1 className="text-3xl lg:text-5xl font-bold mb-5 lg:mb-10">
        No se encontró unidad extraible
      </h1>
      <h1 className="text-3xl lg:text-5xl font-bold">
        Conecta la unidad y presiona el botón rojo para volver a comprobar
      </h1>
    </div>
  )
}
