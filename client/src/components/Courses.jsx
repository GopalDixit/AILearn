import Card from "./Card";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BASE_URL } from "../App";

const Courses = ({ dummyData, darkMode, setDarkMode, youtube, setYoutube }) => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  return (
    <div className="courseContainer">
      <h1 className="CourseHeading">Premium Courses</h1>
      <div className="CardContainer">
        {dummyData?.map((data, index) => (
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
    </div>
  );
};
export default Courses;
