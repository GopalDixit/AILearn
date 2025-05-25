// import React, { useEffect, useRef, useState } from 'react';
// import styles from './MockInterview.module.css';

// const MockInterview = () => {
//   const videoRef = useRef(null);
//   const [code, setCode] = useState('');
//   const [question, setQuestion] = useState('What is a closure in JavaScript?');
//   const [answer, setAnswer] = useState(
//     'A closure is a function that retains access to its lexical scope even when executed outside that scope.'
//   );

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((err) => {
//         console.error('Error accessing camera:', err);
//       });
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.leftPanel}>
//         <div className={styles.cameraSection}>
//           <video ref={videoRef} autoPlay muted className={styles.video}></video>
//         </div>
//         <div className={styles.editorSection}>
//           <textarea
//             className={styles.codeEditor}
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="// Write your code here..."
//           />
//         </div>
//       </div>
//       <div className={styles.rightPanel}>
//         <div className={styles.qaBoard}>
//           <h3>Question</h3>
//           <p className={styles.question}>{question}</p>
//           <h3>Answer</h3>
//           <p className={styles.answer}>{answer}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MockInterview;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const MockInterview = () => {
//   const [topic, setTopic] = useState('');
//   const [difficulty, setDifficulty] = useState('');
//   const [started, setStarted] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [currentQIndex, setCurrentQIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [showResult, setShowResult] = useState(false);
//   const [score, setScore] = useState(0);
//   const [showEditor, setShowEditor] = useState(false);
//   const [language, setLanguage] = useState('54'); // C++ default
//   const [code, setCode] = useState(`#include <iostream>\nint main() {\n  std::cout << "Hello, World!";\n  return 0;\n}`);
//   const [output, setOutput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const videoRef = useRef(null);

//   const QUIZ_API_KEY = '3lsgjMYPph1HBauH1DXErdP5POak0dhb2Mp0S060';
//   const JUDGE_API_KEY = '3lsgjMYPph1HBauH1DXErdP5POak0dhb2Mp0S060'; // Replace with your Judge0 API key

//   const startInterview = async () => {
//     if (!topic || !difficulty) return alert("Please select topic and difficulty");
//     setStarted(true);
//     startWebcam();
//     try {
//       const response = await axios.get('https://quizapi.io/api/v1/questions', {
//         headers: { 'X-Api-Key': QUIZ_API_KEY },
//         params: {
//           category: topic,
//           difficulty: difficulty.toLowerCase(),
//           limit: 5
//         }
//       });

//       const formatted = response.data.map(q => ({
//         question: q.question,
//         options: Object.values(q.answers).filter(a => a !== null),
//         correct: q.correct_answer && q.answers[q.correct_answer]
//       }));

//       setQuestions(formatted);
//     } catch (error) {
//       console.error("API Error:", error);
//       alert("Failed to load questions from API.");
//     }
//   };

//   const startWebcam = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       })
//       .catch(err => console.error("Webcam error:", err));
//   };

//   const handleOptionClick = (option) => {
//     setAnswers({ ...answers, [currentQIndex]: option });
//     if (currentQIndex < questions.length - 1) {
//       setCurrentQIndex(currentQIndex + 1);
//     } else {
//       finishInterview();
//     }
//   };

//   const finishInterview = () => {
//     let sc = 0;
//     questions.forEach((q, idx) => {
//       if (answers[idx] === q.correct) sc++;
//     });
//     setScore(sc);
//     setShowResult(true);
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//     }
//   };

//   const runCode = async () => {
//     setLoading(true);
//     setOutput('Running...');
//     try {
//       const res = await axios.post(
//         'https://judge0-ce.p.rapidapi.com/submissions',
//         {
//           language_id: language,
//           source_code: code,
//           stdin: '',
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-RapidAPI-Key': JUDGE_API_KEY,
//             'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
//           },
//         }
//       );

//       const token = res.data.token;

//       const poll = setInterval(async () => {
//         const result = await axios.get(
//           `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
//           {
//             headers: {
//               'X-RapidAPI-Key': JUDGE_API_KEY,
//               'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
//             },
//           }
//         );
//         if (result.data.status.description !== 'In Queue') {
//           clearInterval(poll);
//           setOutput(result.data.stdout || result.data.stderr || result.data.compile_output || 'No output');
//           setLoading(false);
//         }
//       }, 2000);
//     } catch (err) {
//       setLoading(false);
//       setOutput('Error running code');
//     }
//   };

//   return (
//     <div style={{ fontFamily: 'Arial', padding: 20, maxWidth: 800, margin: 'auto' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <h2>Mock Interview Platform</h2>
//         <button onClick={() => setShowEditor(!showEditor)} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
//           {showEditor ? 'Close Editor' : 'Editor'}
//         </button>
//       </div>

//       {showEditor && (
//         <div style={{ marginTop: 20, padding: 15, border: '1px solid #ccc' }}>
//           <h3>Online Code Editor (Programiz Style)</h3>
//           <label>Select Language:</label>
//           <select onChange={(e) => setLanguage(e.target.value)} value={language} style={{ marginLeft: '10px' }}>
//             <option value="54">C++</option>
//             <option value="62">Java</option>
//             <option value="71">Python</option>
//             <option value="63">JavaScript</option>
//           </select>
//           <br /><br />
//           <textarea
//             rows="10"
//             cols="80"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             style={{ fontFamily: 'monospace', width: '100%' }}
//           />
//           <br />
//           <button onClick={runCode} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
//             {loading ? 'Running...' : 'Run Code'}
//           </button>
//           <br /><br />
//           <h4>Output:</h4>
//           <pre>{output}</pre>
//         </div>
//       )}

//       {!started && !showResult && !showEditor && (
//         <>
//           <label>Choose Topic:</label>
//           <select value={topic} onChange={(e) => setTopic(e.target.value)}>
//             <option value="">--Select--</option>
//             <option value="code">Programming</option>
//             <option value="linux">Linux</option>
//             <option value="bash">Bash</option>
//             <option value="docker">Docker</option>
//             <option value="sql">SQL</option>
//           </select>

//           <br /><br />

//           <label>Choose Difficulty:</label>
//           <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
//             <option value="">--Select--</option>
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//           </select>

//           <br /><br />
//           <button onClick={startInterview}>Start Interview</button>
//         </>
//       )}

//       {started && questions.length > 0 && !showResult && !showEditor && (
//         <div>
//           <video ref={videoRef} autoPlay width="300" height="200" style={{ marginBottom: 20 }} />
//           <h3>Q{currentQIndex + 1}: {questions[currentQIndex].question}</h3>
//           <ul>
//             {questions[currentQIndex].options.map((opt, i) => (
//               <li key={i} style={{ margin: '10px 0' }}>
//                 <button onClick={() => handleOptionClick(opt)}>{opt}</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {showResult && !showEditor && (
//         <div>
//           <h2>Interview Result</h2>
//           <p>Score: {score} / {questions.length}</p>
//           <ul>
//             {questions.map((q, i) => (
//               <li key={i}>
//                 <strong>{q.question}</strong><br />
//                 Your Answer: {answers[i] || "Not Answered"}<br />
//                 Correct Answer: {q.correct || "Unavailable"}
//               </li>
//             ))}
//           </ul>
//           <button onClick={() => window.location.reload()}>Restart</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MockInterview;




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
