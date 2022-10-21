import { useFormData } from "../utilities/useFormData";
import { useNavigate } from "react-router-dom";


// check input valid
const validateUserData = (key, val) => {
  switch (key) {
    // case 'title':
    //   return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets':
      return /(W|F|Th|Tu|M)*/.test(val) ? '' : 'must use W|F|Th|Tu|M';
    default: return '';
  }
};

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
    </div>
  );
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);
const CourseEditor = ({course}) => {
  const [state, change] = useFormData(validateUserData, course);
  const submit = (evt) => {};
  return (
    <div style={{marginLeft: '3em'}}>
      {/* <p> -- <Link to={`/CourseEditor`}>Link</Link></p> */}
      <form onSubmit={submit}>
      <InputField name="title" text="Input Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Time" state={state} change={change} />
      <ButtonBar/>
    </form>
    </div>
  );
    
};
  
export default CourseEditor;