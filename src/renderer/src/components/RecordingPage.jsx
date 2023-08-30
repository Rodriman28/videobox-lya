import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { ipcRenderer } from 'electron'

const RecordingPage = () => {
  const webcamRef = useRef(null)
  const navigate = useNavigate()
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  function stopRecording() {
    mediaRecorderRef.current.stop()
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '5') {
        stopRecording()
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
            filePath: `C:/videos-lya/${filename}.mp4`,
            arrayBuffer: arrayBuffer
          })
        }
        fileReader.readAsArrayBuffer(blob)
        navigate('/thank-you')
      }
    }
    setTimeout(() => {
      mediaRecorderRef.current.stop()
    }, 60000)

    startRecording()
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
        <Webcam
          audio={false}
          ref={webcamRef}
          style={{ width: '100%', height: 'auto' }}
          className="object-cover"
        />
        <div className="absolute top-0 right-0 m-4 p-2 text-white font-bold">{10}</div>
      </div>
    </>
  )
}

export default RecordingPage
