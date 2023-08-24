// src/components/ThankYouPage.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(countdownTimer);
        navigate("/");
      }
    }, 1000);

    // const timeout = setTimeout(() => {
    //   navigate("/");
    // }, 10000);

    return () => clearTimeout(countdownTimer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl mb-4 uppercase">¡Gracias por tu mensaje!</h2>
      {/* <h2 className="text-2xl">Volviendo a inicio en: {countdown} </h2> */}
    </div>
  );
};

export default ThankYouPage;
