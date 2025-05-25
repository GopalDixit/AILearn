import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-xk2bq0plbizw00lh.us.auth0.com"
    clientId="UeUGN7zTHAFGGkWqRN8g7tZIpl274HJM"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Auth0Provider>
);
