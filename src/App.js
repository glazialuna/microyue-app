import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import datas from './utilities/cs-courses.json';
import TermPage from './components/TermPage';
import SelectedPage from './components/CourseSelection';


const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};


// loading data from php
const Main = () => {
  // return (
  //   <div>
  //     <Banner text={datas.title} />
  //     <CourseList courses={datas.courses} />
  //   </div>
  // );


  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <div>
      <Banner text={data.title} />
      <CourseList courses={data.courses} />
    </div>
  );


}

const queryClient = new QueryClient();

function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* <Main></Main> */}
        <TermPage courses={datas.courses}></TermPage>
      </div>
    </QueryClientProvider>
  );
} 


export default App;
