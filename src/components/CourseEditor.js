import { useFormData } from "../utilities/useFormData";
import { useNavigate } from "react-router-dom";
import { useDbUpdate } from "../utilities/firebase";

// check input valid
const validateUserData = (id, val) => {
  switch (id) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets':
      return /^$|((W|F|Th|Tu|M)+ (([01]?[0-9]|2[0-3]):[0-5][0-9])+-+(([01]?[0-9]|2[0-3]):[0-5][0-9]))/.test(val) ? '' : 'ex. MTuWThF 0:00-23:59 or empty';
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

const InputField = ({property, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={property} className="form-label">{text}</label>
    <input className="form-control" id={property}
      defaultValue={state.values?.[property]} 
      onChange={change} />
    <p className="text-danger">{state.errors?.[property]}</p>
  </div>
);
const CourseEditor = ({course}) => {
  // initialized
  const [state, change] = useFormData(validateUserData, {values:{title:"AA", meets:"WF 12:00-13:00"}});
  const [update, result] = useDbUpdate(`/courses/${course}`);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors){
      update(state.values);
    }
  };
  console.log(state);
  return (
    <div style={{marginLeft: '10em',marginRight: '10em'}}>
      <form onSubmit={submit}>
      <InputField property="title" text="Input Title" state={state} change={change} />
      <InputField property="meets" text="Meeting Time" state={state} change={change} />
      <ButtonBar/>
      </form>
    </div>
  );
    
};
  
export default CourseEditor;