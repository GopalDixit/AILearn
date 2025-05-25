import React, { useState } from "react";
import styles from "./Card.module.css";
import Player from "./Player";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const Card = ({
  title,
  description,
  Image,
  darkMode,
  setDarkMode,
  youtube,
  setYoutube,
  id,
}) => {
  const className1 = darkMode ? styles.title1 : styles.title;
  const className2 = darkMode ? styles.description1 : styles.description;
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  const handleButton = (e) => {
    console.log(id);

    if (id == 4) {
      setYoutube(
        "https://www.youtube.com/embed/videoseries?si=wLceCv0Zb5hcKNV7&amp;list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA"
      );
    } else if (id == 3) {
      setYoutube(
        "https://www.youtube.com/embed/eILUmCJhl64?si=uUO7uREirHMkHoc1"
      );
    } else if (id == 2) {
      setYoutube(
        "https://www.youtube.com/embed/LvC68w9JS4Y?si=QvbW8pE1W1bRFa_W"
      );
    } else if (id == 1) {
      setYoutube(
        "https://www.youtube.com/embed/H-RKfV2ZJbI?si=18QyWHouPwvjcW8g"
      );
    } else if (id == 13) {
      setYoutube(
        "https://www.youtube.com/embed/videoseries?si=pY9LTnpbZdRi-RV6&amp;list=PLjVLYmrlmjGfGLShoW0vVX_tcyT8u1Y3E"
      );
    } else if (id == 11) {
      setYoutube(
        "https://www.youtube.com/embed/Oe421EPjeBE?si=TzNxwR8X_CXDBYUe"
      );
    } else if (id == 7) {
      setYoutube(
        "https://www.youtube.com/embed/rklidcZ-aLU?si=kZTmZaG9y0C6xYV6"
      );
    } else if (id == 15) {
      setYoutube(
        "https://www.youtube.com/embed/EgDmCbhmstU?si=arMHBh14DJw0KitR"
      );
    } else if (id == 6) {
      setYoutube(
        "https://www.youtube.com/embed/irqbmMNs2Bo?si=Ss7DHo5sjj3Pn01W"
      );
    } else if (id == 12) {
      setYoutube(
        "https://www.youtube.com/embed/videoseries?si=cdL-rrZlPQduoC56&amp;list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg"
      );
    } else if (id == 5) {
      setYoutube(
        "https://www.youtube.com/embed/videoseries?si=fajtZwmZ3rOBHkH8&amp;list=PLxgZQoSe9cg0df_GxVjz3DD_Gck5tMXAd"
      );
    } else if (id == 8) {
      setYoutube(
        "https://www.youtube.com/embed/dSJM4Gyh8jE?si=SaeAsdJU-zTQSo-t"
      );
    } else if (id == 10) {
      setYoutube(
        "https://www.youtube.com/embed/mGN9-FPsX9o?si=1lRqY1Sr5G3AWQL7"
      );
    } else if (id == 14) {
      setYoutube(
        "https://www.youtube.com/embed/HVjjoMvutj4?si=3KiMKrTxt9f0X2eK"
      );
    } else if (id == 8) {
      setYoutube(
        "https://www.youtube.com/embed/dSJM4Gyh8jE?si=SaeAsdJU-zTQSo-t"
      );
    } else if (id == 16) {
      setYoutube(
        "https://www.youtube.com/embed/_fdGmlnR0sY?si=snKbBMO1CJem3t-z"
      );
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.image_placeholder}>
          <img src={Image} alt="Course" />
        </div>
        <div className={styles.content}>
          <span className={styles.tag}>Free Course</span>

          <h1 className={`${className1}`}>{title}</h1>
          <p className={` ${className2}`}>{description}</p>

          <div className={styles.bottom}>
            {isAuthenticated ? (
              <Link
                to="/Player"
                className={styles.button}
                onClick={(e) => handleButton(e)}
              >
                Start Course
              </Link>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
