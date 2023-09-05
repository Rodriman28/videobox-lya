import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { ipcRenderer } from 'electron'
import Spinner from './Spinner/Spinner'

const RecordingPage = () => {
  const timer = import.meta.env.RENDERER_VITE_TIMER
  const webcamRef = useRef(null)
  const navigate = useNavigate()
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const [isRecording, setIsRecording] = useState(false)
  const [countdown, setCountdown] = useState(timer)

  function stopRecording() {
    mediaRecorderRef.current.stop()
  }

  useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
  }, [isRecording, countdown])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '5') {
        setTimeout(() => {
          stopRecording()
        }, 500)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  useEffect(() => {
    async function startRecording() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1920,
          height: 1080
        }
      })
      mediaRecorderRef.current = new MediaRecorder(stream)
      console.log(mediaRecorderRef.current)
      mediaRecorderRef.current.start()

      mediaRecorderRef.current.onstart = () => {
        setIsRecording(true)
      }

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' })

        const date = new Date()
        const dia = date
          .toLocaleDateString('es-UY', { timeZone: 'America/Montevideo' })
          .split('/')[0]
        const mes = date
          .toLocaleDateString('es-UY', { timeZone: 'America/Montevideo' })
          .split('/')[1]
        const anio = date
          .toLocaleDateString('es-UY', { timeZone: 'America/Montevideo' })
          .split('/')[2]

        const hora = date.getHours()
        const minutos = date.getMinutes()
        const segundos = date.getSeconds()
        const filename = `${dia}-${mes}-${anio}_${hora}-${minutos}-${segundos}`

        const fileReader = new FileReader()
        fileReader.onloadend = () => {
          const arrayBuffer = fileReader.result
          ipcRenderer.send('save-file', {
            fileName: `${filename}.mp4`,
            arrayBuffer: arrayBuffer
          })
        }
        fileReader.readAsArrayBuffer(blob)
        chunksRef.current = []
        setIsRecording(false)
        navigate('/thank-you')
      }
    }
    startRecording()

    setTimeout(() => {
      mediaRecorderRef.current.stop()
    }, timer * 1000)
  }, [navigate])

  ipcRenderer.on('save-video-response', (event, response) => {
    if (response.success) {
      console.log('Video saved successfully.')
    } else {
      console.error('Error saving video:', response.error)
    }
  })

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
        {!isRecording && (
          <div className="absolute">
            <Spinner />
          </div>
        )}
        <Webcam ref={webcamRef} width={1920} height={1080} />
        {isRecording ? (
          <div className=" rounded-lg absolute bottom-8 right-8 px-2 py-1 align-middle justify-center transition-colors ">
            <p
              className={`${
                countdown <= 10 ? 'text-8xl text-red-600' : 'text-8xl text-gray-500 '
              }  font-bold`}
            >
              {countdown}
            </p>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default RecordingPage
