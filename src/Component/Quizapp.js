import React, { useRef, useState } from 'react'
import './Quiz.css'
import {data} from '../Assets/data';
const Quizapp = () => {
    let[index,setindex]=useState(0);
    let[question,setquestion]=useState(data[index]);
let[score,setscore]=useState(0);
let[result,setresult]=useState(false);
    //create lock  hook so that we can lock ans 
    let[lock,setlock]=useState(false);
  const checkans=(e,ans)=>{
    if(lock===false){
        if(question.ans===ans){
            e.target.classList.add("correct");
            setlock(true);
            setscore(++score);
       
        }
        else{
            e.target.classList.add("wrong");
            setlock(true);
            Option_arr[question.ans-1].current.classList.add("correct");
        }
    }

}

let Option1=useRef(null);
let Option2=useRef(null);
let Option3=useRef(null);
let Option4=useRef(null);
let Option_arr=[Option1,Option2,Option3,Option4];

function nextchange(){
   
    if(lock===true){
        if(index===data.length-1){
setresult(true);
return 0;//so that no other thing executed next
        }
setindex(index=index+1);
setquestion(data[index]);
setlock(false);
Option_arr.map((option)=>{
    option.current.classList.remove("wrong");
    option.current.classList.remove("correct");
    return null;

})
    }
}
function setreset(){
    setindex(0);
    setquestion(data[0]);
    setlock(false);
    setresult(false);
    setscore(0);
}
    
  return (
    <div className='container'>
        <h1 >Quiz App</h1>
        <div className='line'></div>
        {result?<></>:<>
        <h2>{index+1}. {question.question}</h2>
        <ul>
           <li ref={Option1} className='list'  onClick={(e)=>{checkans(e,1)} }>{question.option1}</li>
           <li ref={Option2} className='list' onClick= {(e)=>{checkans(e,2)} }>{question.option2}</li>
           <li ref={Option3} className='list' onClick= {(e)=>{checkans(e,3)} }>{question.option3} </li>
           <li ref={Option4} className='list' onClick={(e)=>{checkans(e,4)} }>{question.option4}</li>
        </ul>
        <button className='buton' onClick={nextchange}>Next</button>
        <div className='index'>{index+1} of {data.length} questions</div>
        </>}
        {result?
        <>
        <h2>You scored {score} out of {data.length} </h2><br/>
        <button className='buton' onClick={setreset}>reset</button>
        </>:<></>}
    </div>
  )
}


export default Quizapp