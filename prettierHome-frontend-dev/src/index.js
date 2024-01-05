import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import { PrimeReactProvider } from "primereact/api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
    <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
