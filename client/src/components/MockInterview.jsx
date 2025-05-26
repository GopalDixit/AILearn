import React, { useEffect, useRef, useState } from 'react';
import styles from './MockInterview.module.css';
import * as faceapi from 'face-api.js';
import QuizComponent from './QuizComponent';

const MockInterview = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  const [code, setCode] = useState('');
  const [question] = useState('What is a closure in JavaScript?');
  const [answer] = useState(
    'A closure is a function that retains access to its lexical scope even when executed outside that scope.'
  );
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            startFaceDetection();
          };
        }
      } catch (err) {
        console.error('Camera error:', err);
      }
    };

    setupCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startFaceDetection = () => {
    intervalRef.current = setInterval(async () => {
      if (videoRef.current) {
        const detection = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        const warningEl = document.getElementById('face-warning');
        if (warningEl) {
          warningEl.style.display = detection ? 'none' : 'block';
        }
      }
    }, 1000);
  };

  const stopFaceDetection = () => {
    clearInterval(intervalRef.current);
    const warningEl = document.getElementById('face-warning');
    if (warningEl) {
      warningEl.style.display = 'none';
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    stopFaceDetection();
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        startFaceDetection();
      }
    }
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.cameraSection}>
          <div id="face-warning" className={styles.faceWarning}>
            ⚠️ No face detected!
          </div>
          <video ref={videoRef} autoPlay muted className={styles.video}></video>
          <button onClick={toggleCamera} className={styles.toggleButton}>
            {isCameraOn ? 'Camera Off' : 'Camera On'}
          </button>
        </div>
        {/* <div className={styles.editorSection}>
            <iframe  className={styles.responsiveIframe} src="https://onecompiler.com/"  frameborder="0"></iframe>
        </div> */}
      </div>
      <div className={styles.rightPanel}>
         <QuizComponent/>
      </div>
    </div>
  );
};
export default MockInterview;
