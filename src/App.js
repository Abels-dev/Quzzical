import React from "react";
import Intro from "./Intro";
import Question from "./Question";
import "./style.css";
const App=()=>{
    return (
        <div className="container">
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
          <button className="checkBtn">Check answers</button>
        </div>
    )
}

export default App;