import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CalendarApp } from "./CalendarApp";
import "./index.css";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CalendarApp />
  </Provider>
);
