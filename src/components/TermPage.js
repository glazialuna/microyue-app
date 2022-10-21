import {useState} from "react";
import CourseList from "./CourseList";
import SelectedPage from "./CourseSelection";
import Modal from "./Modal";
import { conflict } from "../utilities/conflict";

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


const TermPage = ({courses}) =>{
    // filter Terms
    const [termChoice, setTerm] = useState('Fall');
    const filterTerm = Object.fromEntries(
                        Object.entries(courses)
                        .filter(([key, course]) => course.term === termChoice));

    // Course Selection
    const [selected, setSelected] = useState([]);
    const selectCourse = Object.keys(courses)
                            .filter(c=>selected.includes(c))
                            .map(c=>courses[c]);

    

    // Control the Modal
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);



    return (
        <div>
            <TermSelector termChoice={termChoice} setTerm={setTerm}></TermSelector>
            <button className="btn btn-outline-dark mb-1 p-2" onClick={openModal} style={{float:"right"}}>Course Plan</button>
            <Modal open={open} close={closeModal}>
                {
                    selected.length 
                    // remains fixing why selected = selected not selected
                        ?<CourseList courses={selectCourse} selected={[]}></CourseList>
                        :"You can click on card to select courses"
                }       
            </Modal>
            <h1>{termChoice}</h1>
            <SelectedPage courses={filterTerm} selected={selected} setSelected={setSelected}></SelectedPage>
        </div>
    );
};

export default TermPage;