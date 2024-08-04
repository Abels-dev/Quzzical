import React from "react";
import blob5 from './img/blob5.png'
import blob4 from './img/blobs.png'
const Intro=(props)=>{
    return (
        <div className="intro">
            <h1>Quizzical</h1>
            <p>some description here</p>
            <button className="start" onClick={props.start}>Start quiz</button>
            <img src={blob5} className="blob5" alt="somepic"/>
            <img src={blob4} className="blob4" alt="somepic"/>
        </div>
    )
}

export default Intro;