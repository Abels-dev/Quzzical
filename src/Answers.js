import React from "react";

const Answers = (props) => {
   // const checkCorrect=(props.isCorrect&&props.isSelect)
   return (
      <button
         onClick={props.handleSelect}
         className={`${props.isSelect ? "selected" : ""} ${
            (props.isCorrect||props.correctAnswer) ? "correct" : ""
         } ${props.isWrong ? "wrong" : ""}`}>
         {props.answer}
      </button>
   );
};

export default Answers;
