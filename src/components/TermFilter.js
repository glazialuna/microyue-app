import {useState} from "react";
import CourseList from "./CourseList";
import datas from '../utilities/cs-courses.json';
const terms = ['Fall', 'Spring', 'Winter'];


const TermButton = ({term, termChoice, setTerm}) => (
    <div>
        <input type="radio" id={term} className="btn-check" checked={term === termChoice} autoComplete="off" onChange={()=>setTerm(term)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={term}>
            {term}
        </label>
    </div>
);

const TermSelector = ({termChoice, setTerm}) => (
    <div className="btn-group">
        {
            Object.values(terms).map(
                term => <TermButton key = {term} term = {term} termChoice={termChoice} setTerm={setTerm} ></TermButton>
                )
        }
    </div>
);


const TermPage = () =>{
    const [termChoice, setTerm] = useState('Fall');
    const filterTerm = Object.values(datas.courses).filter(course => course.term === termChoice);

    return (
        <div>
            <TermSelector termChoice={termChoice} setTerm={setTerm}></TermSelector>
            <h1>{termChoice}</h1>
            <CourseList courses={filterTerm}></CourseList>
        </div>
    );
};

export default TermPage;