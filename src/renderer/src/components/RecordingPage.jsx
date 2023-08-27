/* eslint-disable prettier/prettier */
// src/components/RecordingPage.js
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { saveAs } from 'file-saver'
// import * as fs from "fs"

const RecordingPage = () => {
  const timer = 10
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(timer );

  useEffect(() => {
    async function startRecording() {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })

      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.start()

      mediaRecorderRef.current.ondataavailable = (e) => {
        console.log(e.data)
        chunksRef.current.push(e.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const fecha = new Date()
        const filename = 
        fecha.toLocaleString({timeZone: "America/Montevideo"}).split(',')[0].split("/")[0] 
        + "-" + 
        fecha.toLocaleString({timeZone: "America/Montevideo"}).split(',')[0].split("/")[1] 
        + "-" + 
        fecha.toLocaleString({timeZone: "America/Montevideo"}).split(',')[0].split("/")[2] 
        + "_" + 
        fecha.toLocaleString({timeZone: "America/Montevideo"}).split(', ')[1].split(":")[0] 
        + "-" + 
        fecha.toLocaleString({timeZone: "America/Montevideo"}).split(', ')[1].split(":")[1] 
        + "-" + 
        fecha.toLocaleString({timeZone: "America/Montevideo"}).split(', ')[1].split(":")[2]
        let blob = new Blob(chunksRef.current, { type: 'video/mp4' })
        saveAs(blob, filename + '.mp4')
        // await fs.writeFile(`c:/${filename}.mp4`,blob)
        // fs.writeFileSync(`c:/${filename}.mp4`,blob)
        navigate('/thank-you')
        chunksRef.current = []
      }
    }
    setTimeout(() => {
      
      mediaRecorderRef.current.stop()
    }, (timer * 1000) + 5000)

    const countdownTimer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(countdownTimer);
      }
    }, 1000);
    startRecording()
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Webcam
        audio={false}
        ref={webcamRef}
        style={{ width: '100%', height: 'auto' }}
        className="object-cover"
      />
      <div className="absolute top-0 right-0 m-4 p-2 text-white font-bold">
        {countdown}
      </div>
    </div>
  )
}

export default RecordingPage
