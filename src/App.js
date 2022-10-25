import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import datas from './utilities/cs-courses.json';
import TermPage from './components/TermPage';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CourseEditor from './components/CourseEditor';
import { useDbData, useProfile } from './utilities/firebase';
import { signInWithGoogle, signOut, useAuthState,listAllUsers } from './utilities/firebase';

// loading data from php
const Main = () => {
  /* datas from local, data from php  */
  // const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [data, error] = useDbData('/');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  // if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  
  
  return (
    <div>
      <BrowserRouter>
        <Routes> 
          {/* adding routes */}
          <Route path="/" element={<TermPage courses={data.courses}></TermPage>}></Route>
          {Object.keys(data.courses).map(id => (
            <Route path={`/CourseEditor/${id}`} element={<CourseEditor course={id}></CourseEditor>}></Route>
          ))}

        </Routes>
      </BrowserRouter>
    </div>
  );


}


const queryClient = new QueryClient();

function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Main></Main>
      </div>
    </QueryClientProvider>
  );
} 


export default App;
