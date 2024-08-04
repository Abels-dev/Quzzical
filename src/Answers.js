import React from "react";

const Answers = (props) => {

   return (
      <button
         onClick={props.handleSelect}
         className={props.isSelect ? "selected" : ""}>
         {props.answer}
      </button>
   );
};

export default Answers;
