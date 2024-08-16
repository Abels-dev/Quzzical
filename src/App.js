import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import he from "he";
import Intro from "./Intro";
import Question from "./Question";
import "./style.css";
const App = () => {
   const [isStarted, setIsStarted] = useState(false);
   const [questions, setQuestions] = useState([]);
   const [checkResult, setCheckResult] = useState(false);
   const [repeatGame, setRepeatGame] = useState(0);
   const [correctCount, setCorrectCount] = useState(0);
   const [trackSelectedAnswers, setTrackSelectedAnswers] = useState([]);
   const start = () => {
      setIsStarted(true);
   };
   const shuffleArray = (array) => {
      // function to shuffle the answers position
      array = array.map((answer) => {
         return { answer: answer, isCorrect: false };
      });
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
   };
   useEffect(() => {
      // fetching the data and setting the questions
      fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
         .then((res) => res.json())
         .then((data) => {
            setQuestions(() => {
               return data.results.map((questionsList, index) => {
                  return {
                     id: index,
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
      countCorrectAnswers();
   };
   const updateSelectedAnswers = (isCorrect, id) => {
      // keep track of selected answers
      let isDuplicated = false;
      setTrackSelectedAnswers((prevAnswer) => {
         const seletedAnswers = [...prevAnswer];
         seletedAnswers.forEach((answer, index) => {
            if (answer.id === id) {
               seletedAnswers[index] = { id, isCorrect };
               isDuplicated = true;
            }
         });
         if (!isDuplicated) seletedAnswers.push({ id, isCorrect });
         return seletedAnswers;
      });
   };
   const countCorrectAnswers = () => {
      // count the correct answers from the selected one
      let correctAnswers = 0;
      trackSelectedAnswers.forEach((answer) => {
         if (answer.isCorrect) correctAnswers++;
      });
      setCorrectCount(correctAnswers);
   };
   const repeatingGame = () => {
      // function to repeat the game when playagain Clicked
      setRepeatGame((prevGameCount) => prevGameCount + 1);
      setCheckResult(false);
      setCorrectCount(0);
      setTrackSelectedAnswers([]);
   };
   const renderQuestions = questions.map((question, index) => {
      // render the questions
      return (
         <Question
            questionDetail={question}
            key={index}
            result={checkResult}
            gameCount={repeatGame}
            updateSelectedAnswers={updateSelectedAnswers}
         />
      );
   });
   const playAgain = // render the play again section and the result
      (
         <div className="playagain-contain">
            <h3>You scored {correctCount}/5 correct answers</h3>
            <button className="playagain" onClick={repeatingGame}>
               Play again
            </button>
         </div>
      );
   return (
      <div className="container">
         {correctCount >=4 && <Confetti width={600} height={600} />}
         {isStarted ? renderQuestions : <Intro start={start} />}
         {!checkResult && isStarted && (
            <button className="checkBtn" onClick={result}>
               Check answers
            </button>
         )}
         {checkResult && playAgain}
      </div>
   );
};

export default App;
