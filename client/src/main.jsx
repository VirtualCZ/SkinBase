import * as ReactDOM from 'react-dom/client';
import React from "react";
import App from "./App";
import "./index.css"
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth0-provider-with-history';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
  </React.StrictMode>
);