import 'bootstrap/dist/css/bootstrap.min.css';
import './CourseList.css'
const CourseList =({courses}) => (
    <div className='course-list'>
        {
            Object.keys(courses).map((c) => (<Course course={courses[c]}/>))
        }
    </div>

    );
const Course = ({course}) => {
    return (
        <div className="card m-1 p-2">
             <div className="card-body">
                <h5 className="card-title">{course.term} CS {course.number}</h5>
                <div className="card-text">{course.title}</div>
                <div className="card-footer">{course.meets}</div>
            </div>
        </div>
    );
}

export default CourseList;