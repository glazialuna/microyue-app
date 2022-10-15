import {useState} from "react";
import CourseList from "./CourseList";


const SelectedPage = ({courses}) => {
    const [selected, setSelected] = useState([]);
    // console.log(selected);
  
    const toggleSelected = (item) => setSelected(
      selected.includes(item)
      ? selected.filter(x => x !== item)
      : [...selected, item]
    );
  
    return (
        <CourseList courses={courses} selected={selected} toggleSelected={toggleSelected}></CourseList>
    );
  };
  
  export default SelectedPage;