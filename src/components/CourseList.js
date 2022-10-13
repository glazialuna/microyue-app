import 'bootstrap/dist/css/bootstrap.min.css';
import './CourseList.css'
const CourseList =({courses, selected, toggleSelected}) => (
    <div className='course-list'>
        {
            Object.keys(courses).map((c) => (<Course key={c} id={c} course={courses[c]} selected={selected} toggleSelected={toggleSelected}/>))
        }
    </div>

    );
const Course = ({id, course, selected, toggleSelected}) => {
    return (
        <div className="card m-1 p-2" onClick={() => toggleSelected(id)}>
             <div className={`card-body ${selected.includes(id) ? 'selected' : ''}`}>
                <h5 className="card-title">{course.term} CS {course.number}</h5>
                    <div className="card-text">{course.title}</div>
                    <div className="card-footer">{course.meets}</div>
            </div>
        </div>
    );
}

export default CourseList;