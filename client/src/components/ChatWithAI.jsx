import { useEffect, useRef, useState } from "react";
import { RiVoiceAiLine } from "react-icons/ri";
import axios from "axios";
import styles from "./ChatWithAI.module.css";
// import { sendMsgToOpenAI } from "./Openai";
const ChatWithAI = () => {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    {
      text: "Hi, I am ChatWithAI ,I will help different type in your study",
      isBot: true,
    },
  ]);
  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [output]);
  // const handleSend = async () => {
  //   const res = await sendMsgToOpenAI();
  //   console.log(res);
  // };
  const generateAnswer = async () => {
    const text = input;
    setInput("");
    setOutput([
      ...output,
      {
        text,
        isBot: false,
      },
    ]);
    // setOutput("Loading...");
    const cq = [
      "what is your name",
      "who created you",
      "please tell me about this website",
    ];
    const ca = [
      "My name is AI Chat Bot, I'm here to help you.",
      `I was created by Google, as part of the Gemini family of large language models developed by Google DeepMind and other AI teams at Google. Gopal Dixit integrated me here to help you.`,
      "This is a Academic Harbor website where yor fullfill all our academic needs and in this website we provide student personal workspace where student save file download file and delete file and access different types of course",
    ];

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAbOmZngADcS3kEFbz_qInp5MFSq8VutTI",
      method: "post",
      data: {
        contents: [{ parts: [{ text: input }] }],
      },
    });

    const gen =
      response["data"]["candidates"][0]["content"]["parts"][0]["text"];
    setOutput([...output, { text, isBot: false }, { text: gen, isBot: true }]);
  };
  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput("");
    setOutput([
      ...output,
      {
        text,
        isBot: false,
      },
    ]);
   

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAbOmZngADcS3kEFbz_qInp5MFSq8VutTI",
      method: "post",
      data: {
        contents: [{ parts: [{ text: text }] }],
      },
    });
    const gen =
      response["data"]["candidates"][0]["content"]["parts"][0]["text"];
    setOutput([...output, { text, isBot: false }, { text: gen, isBot: true }]);
    console.log(gen);
  };
  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      await generateAnswer();
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
  
    recognition.onstart = () => {
      console.log("Listening...");
    };
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  
    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };
  
    recognition.start();
  };
  
  return (
    <div className={styles.ContainerChat}>
      <div className={styles.app}>
        <div className={styles.sideBar}>
          <div className={styles.upperSide}>
            <div className={styles.upperSideTop}>
              <img
                height="70px"
                width="70px"
                src="chat-bot.gif"
                alt="logo"
                className={styles.logo}
              />
              <span className={styles.brand}>ChatWithAI</span>
            </div>
            <button
              className={styles.midBtn}
              onClick={() => {
                window.location.reload();
              }}
            >
              <img src="add-30.png" alt="new chat" className={styles.addBtn} />
              New Chat
            </button>
            <div className={styles.upperSideBottom}>
              <button
                className={styles.query}
                value={"What is Programming?"}
                onClick={handleQuery}
              >
                <img src="message.svg" alt="query" />
                What is Programming?
              </button>
              <button
                className={styles.query}
                value={"How to use an API"}
                onClick={handleQuery}
              >
                <img src="message.svg" alt="query" />
                How to use an API
              </button>
            </div>
          </div>
          <div className={styles.lowerSide}>
            <div
              className={styles.listItems}
              onClick={() => {
                window.location.href = "http://localhost:5173/";
              }}
            >
              <img src="home.svg" alt="" className={styles.listItemsImg} />
              Home
            </div>
            <div className={styles.listItems}>
              <img src="bookmark.svg" alt="" className={styles.listItemsImg} />
              Save
            </div>
            <div className={styles.listItems}>
              <img src="rocket.svg" alt="" className={styles.listItemsImg} />
              Upgrade to Pro
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.chats}>
            {/* <div className={styles.chat}>
              <img className={styles.chatImg} src="user-icon.png" alt="" />
              <p className={styles.txt}>{input}</p>
            </div> */}

            {output.map((meg, i) => (
              <div key={i} className={meg.isBot ? styles.bot : styles.chat}>
                <img
                  className={styles.chatImg}
                  src={meg.isBot ? "aiLogo.jpg" : "userIcon.png"}
                  alt=""
                />

                <pre className={styles.txt}>{meg.text}</pre>
              </div>
            ))}
            <div ref={msgEnd} />
          </div>
          <div className={styles.chatFooter}>
            <div className={styles.inp}>
              <button onClick={startListening} className={styles.micBtn}><RiVoiceAiLine /></button>
              <input
                type="text"
                placeholder="Message Send ...."
                value={input}
                onKeyDown={handleEnter}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button onClick={generateAnswer} className={styles.send}>
                <img src="send.svg" alt="" srcset="" />
              </button>
            </div>
            <p>
              ChatWithAI some time it may be produce inaccurate information
              about people,places,or facts. Because it trained model
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatWithAI;
