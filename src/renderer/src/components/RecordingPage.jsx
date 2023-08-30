import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { ipcRenderer } from 'electron'

const RecordingPage = () => {
  const webcamRef = useRef(null)
  const navigate = useNavigate()
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

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
        console.log(chunksRef.current)
      }
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' })
        console.log('Grabacion detenida')

        const fileReader = new FileReader()
        fileReader.onloadend = () => {
          const arrayBuffer = fileReader.result
          ipcRenderer.send('save-file', {
            filePath: 'C:/Users/Maqsat Sop2/videoslya/video.mp4',
            arrayBuffer: arrayBuffer
          })
        }
        fileReader.readAsArrayBuffer(blob)
        navigate('/thank-you')
      }
    }
    setTimeout(() => {
      mediaRecorderRef.current.stop()
    }, 5000)

    return () => {
      startRecording()
    }
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
