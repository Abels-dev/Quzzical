import React from "react";
import he from "he";
import Intro from "./Intro";
import Question from "./Question";
import "./style.css";
const App = () => {
   const [isStarted, setIsStarted] = React.useState(false);
   const [questions, setQuestions] = React.useState([]);
   const [checkResult, setCheckResult] = React.useState(false);
   const [repeatGame,setRepeatGame]=React.useState(0);
   const start = () => {
      setIsStarted(true);
   };
   const shuffleArray = (array) => {
      array = array.map((answer) => {
         return { answer: answer, isSelected: false };
      });
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
   };
   React.useEffect(() => {
      console.log("i ran")
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
         .then((res) => res.json())
         .then((data) => {
            setQuestions(() => {
               return data.results.map((questionsList) => {
                  return {
                     question: he.decode(questionsList.question),
                     answers: shuffleArray([
                        ...questionsList.incorrect_answers,
                        questionsList.correct_answer,
                     ]),
                     correctAnswer: questionsList.correct_answer,
                  };
               });
            });
         })
         .catch((err) => console.log(err));
   }, [repeatGame]);
   const result = () => {
      setCheckResult(true);
   };
   const repeatingGame=()=>{
         setRepeatGame(prevGameCount=>prevGameCount+1)
         setCheckResult(false);
   }
   const renderQuestions = questions.map((question, index) => {
      return (
         <Question questionDetail={question} key={index} result={checkResult} gameCount={repeatGame} />
      );
   });
   const playAgain = (
      <div className="playagain-contain">
         <h3>You scored 3/5 correct answers</h3>
         <button className="playagain" onClick={repeatingGame}>Play again</button>
      </div>
   );
   return (
      <div className="container">
         {isStarted ? renderQuestions : <Intro start={start} />}
         {(!checkResult&&isStarted) && (
            <button className="checkBtn" onClick={result}>
               Check answers
            </button>
         )}
         {checkResult&&playAgain}
      </div>
   );
};

export default App;
