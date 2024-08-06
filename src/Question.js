import React from "react";
import blob2 from "./img/blob2.png";
import blob3 from "./img/blob3.png";
import Answers from "./Answers";
import he from "he";

const Question = (props) => {
   const [selectedChoice, setSelectedChoice] = React.useState(null);
   let isCorrect = false;
   let isWrong = false;
   let correctAnswer;
   const handleSelect = (index) => {
      setSelectedChoice(index);
     const isCorrect= props.questionDetail.answers[index].answer===props.questionDetail.correctAnswer;
     props.updateSelectedAnswers(isCorrect,props.questionDetail.id);
   };
   React.useEffect(()=>{
      setSelectedChoice(null)
   },[props.gameCount])
   return (
      <div className="question">
         <p>{props.questionDetail.question}</p>
         <div className="answers">
            {props.questionDetail.answers.map((answer, index) => {
               if (props.result) {
                  if (answer.answer === props.questionDetail.correctAnswer)
                     correctAnswer = index;
                  if (index === selectedChoice) {
                     if (answer.answer === props.questionDetail.correctAnswer)
                        isCorrect = true;
                     else isWrong = true;
                  }
               }
               return (
                  <Answers
                     answer={he.decode(answer.answer)}
                     key={index}
                     isCorrect={index === selectedChoice && isCorrect}
                     isWrong={index === selectedChoice && isWrong}
                     isSelect={index === selectedChoice}
                     correctAnswer={index === correctAnswer}
                     incorrectAnswer={props.result&&!(index===correctAnswer)}
                     handleSelect={() =>
                        props.result ? null : handleSelect(index)
                     }
                  />
               );
            })}
         </div>
         <img src={blob2} className="blob2" alt="somepic" />
         <img src={blob3} className="blob3" alt="somepic" />
      </div>
   );
};

export default Question;
