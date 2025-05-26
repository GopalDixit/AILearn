import React, { useState,useEffect,useRef } from "react";
import styles from "./Card.module.css";


const CardDataApi = ({darkMode}) => {
const [apiData, setApiData] = useState([]);

const fetchedRef = useRef(false);

useEffect(() => {
  if (fetchedRef.current) return;

  const fetchApiData = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/courses");
      const data = await res.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  fetchApiData();
  fetchedRef.current = true;
}, []);

return (
  <div>
    {apiData.length > 0 && (
      <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {apiData.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.image_placeholder}>
              <img src={item.Image} alt={"Courses"} />
            </div>
            <div className={styles.content}>
              <span className={styles.tag}>Free Course</span>
              <h1 className={darkMode ? styles.title1 : styles.title}>
                {item.title}
              </h1>
              <p className={darkMode ? styles.description1 : styles.description}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default CardDataApi