import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { ipcRenderer } from 'electron'
import Spinner from './Spinner/Spinner'

const RecordingPage = () => {
  const timer = 60
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
        }, 1000)
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
        video: true
      })

      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.start()

      mediaRecorderRef.current.onstart = () => {
        setIsRecording(true)
      }

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
        setIsRecording(true)
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
            filePath: `D:/${filename}.mp4`,
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
      <div className="flex flex-col items-center justify-center h-screen">
        {!isRecording && (
          <div className="absolute">
            <Spinner />
          </div>
        )}
        <Webcam
          audio={false}
          ref={webcamRef}
          style={{ width: '100%', height: 'auto' }}
          className="object-cover"
        />
        {isRecording ? (
          <div className="bg-black rounded-lg text-2xl absolute bottom-5 right-5 px-2 py-1 text-white font-bold">
            {countdown}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default RecordingPage
