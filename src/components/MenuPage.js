import {useState} from "react";
const meals = {
    Breakfast: 'Breakfast items...',
    Lunch:'Lunch items...',
    Dinner:'Dinner items...'
};

const MenuButton = ({meal, selection, setSelection}) => (
    <div>
        <input type="radio" id={meal} className="btn-check" checked={meal === selection} autoComplete="off" onChange={()=>setSelection(meal)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={meal}>
            {meal}
        </label>
    </div>
);

const MenuSelector =({selection, setSelection}) =>(
    <div>
        {
            Object.keys(meals).map(meal => 
            <MenuButton key={meal} meal={meal} selection={selection} setSelection={setSelection}></MenuButton>
            )
        }
    </div>
);

const Menu = ({selection}) => {
    const [selection, setSelection] = useState(()=>Object.keys(meals)[0]);
    return (
        <div>
            <MenuSelector selection={selection} setSelection={setSelection}></MenuSelector>
            <Menu selection={selection}></Menu>
        </div>
    );
}

export default MenuPage;