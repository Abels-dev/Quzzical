import React from "react";
import blob2 from "./img/blob2.png";
import blob3 from "./img/blob3.png";
import Answers from "./Answers";
import he from "he";

const Question = (props) => {
   const [selectedAnswer, setSelectedAnswer] = React.useState(null);

   const select = (index) => {
      setSelectedAnswer(index);
   };
   return (
      <div className="question">
         <p>{props.questionDetail.question}</p>
         <div className="answers">
            {props.questionDetail.answers.map((answer, index) => (
               <Answers
                  answer={he.decode(answer)}
                  key={index}
                  isSelect={selectedAnswer === index}
                  handleSelect={() => select(index)}
               />
            ))}
         </div>
         <img src={blob2} className="blob2" alt="somepic" />
         <img src={blob3} className="blob3" alt="somepic" />
      </div>
   );
};

export default Question;
