import React from "react";
import blob2 from "./img/blob2.png";
import blob3 from "./img/blob3.png";
import Answers from "./Answers";
import he from "he";

const Question = (props) => {
   return (
      <div className="question">
         <p>{props.question}</p>
         {props.answers.map((answer, index) => (
               <Answers answer={he.decode(answer)} key={index}/>
            ))}
         <img src={blob2} className="blob2" alt="somepic" />
         <img src={blob3} className="blob3" alt="somepic" />
      </div>
   );
};

export default Question;
