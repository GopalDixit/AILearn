import React, { useState, useEffect,useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import "./App.css";
import MainComponent from "./components/MainComponent";
import Notepad from "./components/Notepad";
import Card from "./components/Card";
import Footer from "./components/Footer";
import ChatWithAI from "./components/ChatWithAI";
import Player from "./components/Player";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import { useAuth0 } from "@auth0/auth0-react";
import AboutUs from "./components/AboutUs";
import PdfUploadComponent from "./components/PdfUploadComponent";
import MockInterview from "./components/MockInterview";
import Compiler from "./components/Compiler";
import CardDataApi from "./components/CardDataApi";
export const BASE_URL = "http://localhost:9000";
const App = () => {
  const dummyData = [
    {
      id: 1,
      title: "AI Course",
      description: "This is the best AI course Embark on an exciting journey into the world of artificial intelligence with our AI Course! Designed to equip you with the foundational and advanced skills needed in AI, this course covers everything from machine learning algorithms to neural networks and deep learning. Engage in hands-on projects that allow you to apply AI techniques to real-world problems, making your learning experience practical and impactful.",
      Image: "ai.jpg",
    },
    {
      id: 2,
      title: "ML Course",
      description: "This is the best ML course Unlock the power of data with our Machine Learning (ML) Course! This comprehensive program is designed to teach you the essential techniques and algorithms used in machine learning to turn data into actionable insights. Through hands-on projects, you’ll learn to build predictive models, work with large datasets, and apply machine learning solutions to real-world problems",
      Image: "ml.jpg",
    },
    {
      id: 16,
      title: "Prompt Engineering Course",
      description: "This is the best Prompt Engineering course Discover the power of efficient communication with AI through our Prompt Engineering Course! This course is designed to teach you the art of crafting precise and effective prompts to elicit accurate and useful responses from AI models. Dive into hands-on projects that help you understand how to optimize interactions with AI, making your applications smarter and more intuitive",
      Image: "prompt.png",
    },
    {
      id: 3,
      title: "React Course",
      description: "This is the best React course Unlock the full potential of modern web development with our comprehensive React JS and Redux course! Dive into the world of cutting-edge technology by mastering React, the most popular JavaScript library for creating dynamic user interfaces, and Redux, the robust state management tool that ensures your applications run seamlessly.",
      Image: "react.png",
    },

    {
      id: 4,
      title: "DSA With C++",
      description: "This is the best DSA With C++ Course PlayList Master the fundamentals of algorithmic thinking and problem-solving with our DSA (Data Structures and Algorithms) With C++ Course! This course is meticulously designed to help you build a strong foundation in data structures and algorithms using C++, one of the most powerful and versatile programming languages.",
      Image: "dsa.png",
    },
    {
      id: 5,
      title: " C++ course",
      description: "This C++ course provides a comprehensive introduction to object-oriented programming using C++It covers fundamental concepts such as variables, loops, functions, arrays, and classes.Students will learn advanced topics like inheritance, polymorphism, file handling, and templates.The course includes hands-on coding exercises and real-world projects for practical experience.By the end, learners will be equipped to develop efficient and robust C++ applications",
      Image: "cpp.png",
    },
    {
      id: 6,
      title: "C course",
      description: "This is the best C course",
      Image: "c.png",
    },
    {
      id: 7,
      title: "HTML Course",
      description: "This is the best HTML course",
      Image: "html.png",
    },
    {
      id: 8,
      title: "CSS Course",
      description: "This is the best CSS course",
      Image: "css.png",
    },
    {
      id: 15,
      title: "Javascript Course",
      description: "This is the best Javascript course",
      Image: "javascript.png",
    },
    {
      id: 9,
      title: "Java Course",
      description: "This is the best JAVA course",
      Image: "java.png",
    },
    {
      id: 10,
      title: "TailWind CSS Course",
      description: "This is the best TailWind CSS course",
      Image: "tailwind.png",
    },
    {
      id: 11,
      title: "Node.js Course",
      description: "This is the best Node.js course",
      Image: "node.png",
    },
    {
      id: 12,
      title: "Python CSS Course",
      description: "This is the best Python course",
      Image: "python.png",
    },
    {
      id: 13,
      title: "Flutter Course",
      description: "This is the best Flutter course",
      Image: "flutter.png",
    },
    {
      id: 14,
      title: "Full Stack Web Development Course",
      description: "This is the best Full Stack Web Development course",
      Image: "fullstack.png",
    },
  ];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [youtube, setYoutube] = useState("");
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
    const trendingRef = useRef(null);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode ? "dark" : "light");
  }, [darkMode]);

  const scrollToTrending = () => {
    console.log("scroll");
    if (trendingRef.current) {
      trendingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (error) return <div>{error}</div>;

  if (loading) return <div>Loading....</div>;
  return (
    <div className="app">
      <Router>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Switch>
          <Route path="/ChatWithAI" component={ChatWithAI} />
          <Route path="/MockInterview" component={MockInterview} />
          <Route path="/Compiler" component={Compiler} />
          <Route path="/Notepad" component={Notepad} />
          <Route path="/Player">
            <Player youtube={youtube} />
          </Route>
          <Route path="/PdfUploadComponent" component={PdfUploadComponent
          } />
          <Route path="/AboutUs" component={AboutUs} darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Route path="/Contact" component={Contact} />
          <Route path="/Courses">
            <Courses
              dummyData={dummyData}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              youtube={youtube}
              setYoutube={setYoutube}
            />
            <CardDataApi
              darkMode={darkMode}
              setDarkMode={setDarkMode}
             
            />
          </Route>

          <Route path="/" exact>
            <MainComponent scrollToTrending={scrollToTrending} darkMode={darkMode} setDarkMode={setDarkMode} />
            <center>
              <h1 className="CourseH1">Trending Courses</h1>
            </center>
            <div ref={trendingRef} className="CardContainer">
              {dummyData.slice(0, 6).map((data, index) => (
                <Card
                  key={index}
                  id={data.id}
                  title={data.title}
                  description={data.description}
                  Image={data.Image}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  youtube={youtube}
                  setYoutube={setYoutube}
                />
              ))}
            </div>
            <footer>
              <Footer />
            </footer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
