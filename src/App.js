import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import datas from './utilities/cs-courses.json';
import TermPage from './components/TermPage';



// loading data from php
const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <div>
      {/* datas from local, data from php  */}
      <TermPage courses={data.courses}></TermPage>
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
