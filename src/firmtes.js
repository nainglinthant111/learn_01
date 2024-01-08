import { useReducer, useState } from 'react';
import './index.css';

const intialvalue = {
	people: [],
};
function reducer(state, action) {
	if (action.type === 'INPUT_ADDED') {
		const newPeople = [ ...state.people, action.payload ];
		return { ...state, people: newPeople };
	}
}
function Peop() {
	const [ inputValue, setInputValue ] = useState('');

	const [ state, dispatch ] = useReducer(reducer, intialvalue);
	function SubmitHandler(e) {
		e.preventDefault();
		const newItem = {
			id: Math.random().toString(),
			name: inputValue,
		};
		dispatch({ type: 'INPUT_ADDED', payload: newItem });
		setInputValue('');
	}
	return (
		<div>
			<h2>Form Test</h2>
			<form onSubmit={SubmitHandler}>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Enter a text"
				/>
				<button type="submit">Submit</button>
			</form>
			<ul>
				{state.people.map((person) => {
					return <li key={person.id}>{person.name}</li>;
				})}
			</ul>
		</div>
	);
}
export default Peop;
