
// QuizComponent.jsx
import React, { useState } from 'react';
import styles from './QuizComponent.module.css';

const dummyQuestions = [
      // Easy JavaScript Questions
      {
        id: 1,
        question: "What does 'typeof []' return in JavaScript?",
        options: ["object", "array", "list", "undefined"],
        answer: "object",
        language: "javascript",
        difficulty: "easy"
      },
      {
        id: 2,
        question: "Which of these is not a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Character"],
        answer: "Character",
        language: "javascript",
        difficulty: "easy"
      },
      {
        id: 3,
        question: "Which company developed JavaScript?",
        options: ["Mozilla", "Netscape", "Microsoft", "Oracle"],
        answer: "Netscape",
        language: "javascript",
        difficulty: "easy"
      },
      {
        id: 4,
        question: "How do you write a comment in JavaScript?",
        options: ["<!-- comment -->", "# comment", "// comment", "/* comment"],
        answer: "// comment",
        language: "javascript",
        difficulty: "easy"
      },
      // Easy Python Questions
      {
        id: 5,
        question: "Which keyword is used to define a class in Python?",
        options: ["def", "function", "class", "object"],
        answer: "class",
        language: "python",
        difficulty: "easy"
      },
      {
        id: 6,
        question: "What is the output of len([1, 2, 3]) in Python?",
        options: ["1", "2", "3", "4"],
        answer: "3",
        language: "python",
        difficulty: "easy"
      },
      {
        id: 7,
        question: "Which symbol is used for comments in Python?",
        options: ["//", "--", "#", "/* */"],
        answer: "#",
        language: "python",
        difficulty: "easy"
      },
      {
        id: 8,
        question: "Which function converts a string to a number in Python?",
        options: ["int()", "float()", "str()", "bool()"],
        answer: "int()",
        language: "python",
        difficulty: "easy"
      },
      // Easy Java Questions
      {
        id: 9,
        question: "Which keyword is used to define a class in Java?",
        options: ["class", "def", "function", "object"],
        answer: "class",
        language: "java",
        difficulty: "easy"
      },
      {
        id: 10,
        question: "Which method is the entry point of a Java application?",
        options: ["start()", "main()", "run()", "init()"],
        answer: "main()",
        language: "java",
        difficulty: "easy"
      },
      {
        id: 11,
        question: "Which keyword is used to inherit a class in Java?",
        options: ["inherit", "extends", "implements", "super"],
        answer: "extends",
        language: "java",
        difficulty: "easy"
      },
      {
        id: 12,
        question: "Which of these is not a primitive data type in Java?",
        options: ["int", "String", "char", "boolean"],
        answer: "String",
        language: "java",
        difficulty: "easy"
      },
      // Medium and High Difficulty Manually Added
      {
        id: 13,
        question: "What is the result of '2' + 2 in JavaScript?",
        options: ["4", "22", "NaN", "undefined"],
        answer: "22",
        language: "javascript",
        difficulty: "medium"
      },
      {
        id: 14,
        question: "Which function is used to parse a string to int in JavaScript?",
        options: ["parseInt()", "int()", "toInt()", "convertInt()"],
        answer: "parseInt()",
        language: "javascript",
        difficulty: "medium"
      },
      {
        id: 15,
        question: "What is the output of bool('False') in Python?",
        options: ["False", "True", "None", "Error"],
        answer: "True",
        language: "python",
        difficulty: "medium"
      },
      {
        id: 16,
        question: "What is the default value of boolean in Java?",
        options: ["true", "false", "null", "0"],
        answer: "false",
        language: "java",
        difficulty: "medium"
      },
      {
        id: 17,
        question: "Which symbol is used to denote the start of a block in Python?",
        options: [":", "{", "(", "#"],
        answer: ":",
        language: "python",
        difficulty: "medium"
      },
      {
        id: 18,
        question: "Which method stops the execution of a thread in Java?",
        options: ["stop()", "halt()", "terminate()", "end()"],
        answer: "stop()",
        language: "java",
        difficulty: "high"
      },
      {
        id: 19,
        question: "How can you create an arrow function in JavaScript?",
        options: ["()=>{}", "function=>{}", "{}<=function", "arrow()=>{}"],
        answer: "()=>{}",
        language: "javascript",
        difficulty: "high"
      },
      {
        id: 20,
        question: "What is the output of print('hello' * 2) in Python?",
        options: ["hello2", "hellohello", "hello hello", "Error"],
        answer: "hellohello",
        language: "python",
        difficulty: "medium"
      },
      {
        id: 21,
        question: "Which of these is used to handle exceptions in Java?",
        options: ["try-catch", "catch-throw", "if-else", "do-while"],
        answer: "try-catch",
        language: "java",
        difficulty: "medium"
      },
      {
        id: 22,
        question: "Which keyword is used to prevent inheritance in Java?",
        options: ["final", "static", "const", "private"],
        answer: "final",
        language: "java",
        difficulty: "high"
      }
    ];

function QuizComponent() {
  const [difficulty, setDifficulty] = useState('easy');
  const [language, setLanguage] = useState('javascript');
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const filteredQuestions = dummyQuestions.filter(
    q => q.difficulty === difficulty && q.language === language
  );

  const handleAnswerChange = (id, option) => {
    setAnswers(prev => ({ ...prev, [id]: option }));
  };

  const handleSubmit = () => {
    let score = 0;
    filteredQuestions.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });
    setScore(score);
    setSubmitted(true);
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.quizBox}>
        {!quizStarted ? (
          <div className={styles.centerText}>
            <h1 className={styles.title}>🚀 Programming Quiz</h1>
            <div className={styles.selectorGroup}>
              <label className={styles.label}>Select Difficulty:</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className={styles.select}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className={styles.selectorGroup}>
              <label className={styles.label}>Select Language:</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} className={styles.select}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <button className={styles.startButton} onClick={() => setQuizStarted(true)}>Start Quiz</button>
          </div>
        ) : !submitted ? (
          <div>
            <h2 className={styles.subtitle}>🧠 Answer the Questions</h2>
            <div className={styles.scrollArea}>
              {filteredQuestions.map(q => (
                <div key={q.id} className={styles.questionBlock}>
                  <p className={styles.questionText}>{q.question}</p>
                  {q.options.map(opt => (
                    <label key={opt} className={styles.optionLabel}>
                      <input
                        type="radio"
                        name={`q_${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleAnswerChange(q.id, opt)}
                      /> {opt}
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <button className={styles.submitButton} onClick={handleSubmit}>Submit Quiz</button>
          </div>
        ) : (
          <div>
            <h2 className={styles.subtitle}>🎉 Result</h2>
            <p className={styles.scoreText}>Score: <span>{score} / {filteredQuestions.length}</span></p>
            <div className={styles.scrollArea}>
            {filteredQuestions.map(q => (
              <div key={q.id} className={styles.resultBlock}>
                <p><strong>Q:</strong> {q.question}</p>
                <p>Your Answer: <span className={styles.answer}>{answers[q.id]}</span></p>
                <p>Correct Answer: <span className={styles.correct}>{q.answer}</span></p>
                <p className={answers[q.id] === q.answer ? styles.correctText : styles.incorrectText}>
                  {answers[q.id] === q.answer ? '✅ Correct' : '❌ Incorrect'}
                </p>
              </div>
            ))}
          </div>
            <button className={styles.restartButton} onClick={handleRestart}>Restart Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizComponent;
