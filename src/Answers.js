import React from "react";

const Answers = (props) => {
   return (
      <button
         onClick={props.handleSelect}
         // render different classed based on the conditions 
         className={`${props.isSelect ? "selected" : ""} ${
            (props.isCorrect||props.correctAnswer) ? "correct" : ""
         } ${props.isWrong ? "wrong" : ""} ${props.incorrectAnswer?"incorrect":''}`}>
         {props.answer}
      </button>
   );
};

export default Answers;
