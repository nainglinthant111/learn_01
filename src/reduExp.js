import { useReducer } from 'react';
import './index.css';

const intialvalue = {
	count: 0,
};
function reducer(state, action) {
	if (action.type === 'increment') {
		return {
			...state,
			count: state.count + action.payload,
		};
	}
}
function Set() {
	const [ state, dispatch ] = useReducer(reducer, intialvalue);
	return (
		<div>
			<h2>{state.count}</h2>
			<button onClick={() => dispatch({ type: 'increment', payload: 1 })}>+</button>
		</div>
	);
}
export default Set;
