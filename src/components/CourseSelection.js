import {useState} from "react";
import CourseList from "./CourseList";


const SelectedPage = ({courses, selected, setSelected, termChoice, editButton}) => {
  const filterTerm = Object.fromEntries(
    Object.entries(courses)
    .filter(([key, course]) => course.term === termChoice));
  
    const toggleSelected = (item) => {
      setSelected(
        selected.includes(item)
        ? selected.filter(x => x !== item)
        : [...selected, item]
      );
    }


    
  
    return (
      <div>
        <h1>{termChoice}</h1>
        <CourseList courses={filterTerm} selected={selected} toggleSelected={toggleSelected} editButton={editButton}></CourseList>
      </div>
    );
  };
  
  export default SelectedPage;