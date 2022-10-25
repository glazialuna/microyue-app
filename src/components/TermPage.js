import {useState} from "react";
import CourseList from "./CourseList";
import SelectedPage from "./CourseSelection";
import Modal from "./Modal";
import { signInWithGoogle, signOut, useAuthState,listAllUsers,useProfile, userIsAdmin } from '../utilities/firebase';



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

const SignInButton = () => (
    <button className="ms-auto btn btn-dark mb-1 p-2" onClick={signInWithGoogle} style={{float: 'right'}}>Sign in</button>
  );
  
const SignOutButton = () => (
    <button className="ms-auto btn btn-dark mb-1 p-2" onClick={signOut} style={{float: 'right'}}>Sign out</button>
);


const TermPage = ({courses}) =>{
    // filter Terms
    const [termChoice, setTerm] = useState('Fall');
    

    // Course Selection
    const [selected, setSelected] = useState([]);
    const selectCourse = Object.keys(courses)
                            .filter(c=>selected.includes(c))
                            .map(c=>courses[c]);

    

    // Control the Modal
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    // Sign in/out
    const [user, isAdmin] = useAuthState();
    // console.log(user?user.displayName:"", isAdmin?"admin":"guest");

    return (
        <div>
            <nav className="navigation">
                <TermSelector termChoice={termChoice} setTerm={setTerm}></TermSelector>
                <button className="btn btn-outline-dark mb-1 p-2" onClick={openModal} style={{marginLeft: '1em'}}>Course Plan</button>
                {user ? <i style={{marginLeft: '1em'}}>hello,{user.displayName}</i> : ""}
                {user ? <SignOutButton /> : <SignInButton />}
                <Modal open={open} close={closeModal}>
                    {
                        selected.length 
                        // remains fixing why selected = selected not selected
                            ?<CourseList courses={selectCourse} selected={[]}></CourseList>
                            :"You can click on card to select courses"
                    }       
                </Modal>
            </nav>
            

            {user? <SelectedPage courses={courses} selected={selected} setSelected={setSelected} termChoice={termChoice} editButton={isAdmin}></SelectedPage>
                : <i style={{marginLeft: '1em'}}>Log in first</i>}
            
        </div>
    );
};

export default TermPage;