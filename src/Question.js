import React from "react";
import blob2 from './img/blob2.png'
import blob3 from './img/blob3.png'
const Question=()=>{
      return (
           <div className="question">
            <p>How would one say goodbye in Spanish? </p>
            <div className="answers">
                <button>answer 1</button>
                <button>answer 2</button>
                <button>answer 3</button>
                <button>answer 4</button>
            </div>
            <img src={blob2} className="blob2" alt="somepic"/>
            <img src={blob3} className="blob3" alt="somepic"/>
            </div>
      )
}

export default Question;