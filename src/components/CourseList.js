const CourseList = ({courses}) => {
    return (Object.keys(courses).map((c) => <p>{courses[c].term} CS {courses[c].number}: {courses[c].title}</p>))
}
//     // <div>
//     return (Object.entries(courses).map((c) => <p>{c.term}</p>))
//     {/* </div> */}
// )

// "F101" : {
//     "term": "Fall",
//     "number": "101",
//     "meets" : "MWF 11:00-11:50",
//     "title" : "Computer Science: Concepts, Philosophy, and Connections"
//   },
export default CourseList;