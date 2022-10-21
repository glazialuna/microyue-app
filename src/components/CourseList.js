import 'bootstrap/dist/css/bootstrap.min.css';
import './CourseList.css'
import Noconflictfromlist from '../utilities/conflict';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const CourseList =({courses, selected, toggleSelected}) => (
    <div className='course-list'>
        {
            Object.keys(courses).map((c) => (<Course key={c} id={c} course={courses[c]} selected={selected} toggleSelected={toggleSelected}/>))
        }
    </div>

    );


const Course = ({id, course, selected, toggleSelected}) => {
    
    
    return (
        <div className="card m-1 p-2" onClick={() => { if (Noconflictfromlist(course, selected) | selected.includes(id)) toggleSelected(id);}}>
             <div className={`card-body 
             ${selected.includes(id) ? 'selected' : Noconflictfromlist(course, selected) ? '' :'unselectable'}`}>
                <div className="card-title">
                    <h5>{course.term} CS {course.number}</h5>
                    {/* enable propogation to course plan, href has collapse, button has css */}
                    <a onClick={(evt) => {window.location.href='/CourseEditor';evt.stopPropagation();}} 
                         className="bi bi-file-plus" style={{marginLeft: '3em'}}></a>
                </div>
                <div className="card-text">{course.title}</div>
                <div className="card-footer">{course.meets}</div>
            </div>
        </div>
    );
}

export default CourseList;