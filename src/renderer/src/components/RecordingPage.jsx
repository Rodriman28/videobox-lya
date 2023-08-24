// src/components/RecordingPage.js
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { saveAs } from 'file-saver'

const RecordingPage = () => {
  const timer = 60
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const navigate = useNavigate()
  // const [countdown, setCountdown] = useState(timer);

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

      mediaRecorderRef.current.onstop = () => {
        let blob = new Blob(chunksRef.current, { type: 'video/mp4' })
        saveAs(blob, 'video.mp4')
        navigate('/thank-you')
        chunksRef.current = []
      }
    }
    setTimeout(() => {
      mediaRecorderRef.current.stop()
    }, timer * 1000)

    // const countdownTimer = setInterval(() => {
    //   if (countdown > 1) {
    //     setCountdown(countdown - 1);
    //   } else {
    //     clearInterval(countdownTimer);
    //   }
    // }, 1000);
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
      <div className="absolute top-0 right-0 m-4 p-2 bg-white rounded">
        {/* Cuenta regresiva: {countdown} */}
      </div>
    </div>
  )
}

export default RecordingPage
