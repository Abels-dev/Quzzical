import React from "react";
import he from "he";
import Intro from "./Intro";
import Question from "./Question";
import "./style.css";
const App = () => {
   const [isStarted, setIsStarted] = React.useState(false);
   const [questions, setQuestions] = React.useState([]);
   const [result, setResult] = React.useState([]);
   const start = () => {
      setIsStarted(true);
   };
   React.useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
         .then((res) => res.json())
         .then((data) => setQuestions(data.results))
         .catch((err) => console.log("oops"));
   }, []);
   React.useEffect(() => {
      setResult(() => {
         return questions.map((questionsList) => {
            return {
               question: he.decode(questionsList.question),
               answers: [
                  ...questionsList.incorrect_answers,
                  questionsList.correct_answer],
               correctAnswer: questionsList.correct_answer
            };
         });
      });
   }, [questions]);

   const renderQuestions = result.map((question, index) => {
      return (
         <Question
            questionDetail={question}
            key={index}
         />
      );
   });
   return (
      <div className="container">
         {isStarted ? renderQuestions : <Intro start={start} />}
         {isStarted && <button className="checkBtn">Check answers</button>}
      </div>
   );
};

export default App;
