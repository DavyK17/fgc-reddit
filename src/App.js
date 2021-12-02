import React from "react";
import Header from "./components/Header";
import Reddit from "./api/Reddit";
import "./util/reset.css";
import "./App.css";

function App() {
  Reddit.getAccessToken();

  return (
    <Header />
  );
}

export default App;
