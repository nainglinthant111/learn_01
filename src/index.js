import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { cards } from './cards';
import { default as Peop } from './firmtes';
import './index.css';
import { default as Set } from './reduExp';

function CardList() {
	return (
		<main>
			<div className="card-list">
				{cards.map((card) => {
					return <Card key={card.id} {...card} />;
				})}
			</div>
			<hr />
			<Sed />
			<hr />
			<GetUser />
			<hr />
			<Set />
			<hr />
			<Peop />
			<hr />
		</main>
	);
}

function Card(props) {
	const { image, title, disc } = props;
	function ClickHand() {
		console.log('this button');
	}
	return (
		<section className="card-bg">
			<img src={image} style={{ margin: '0.5em', textAlign: 'center' }} alt="card_image" />
			<h3 style={{ marginTop: '1rem', textAlign: 'center' }}>{title}</h3>
			<p style={{ marginTop: '0.5rem', textAlign: 'center' }}>{disc}</p>
			<button onClick={ClickHand}>Click me</button>
			<NanButton />
		</section>
	);
}

function NanButton() {
	const [ count, setCount ] = useState(0);
	function increase() {
		setCount((preValue) => preValue + 1);
	}
	return (
		<div>
			<h1>{count}</h1>
			<button onClick={increase}>+</button>
		</div>
	);
}

function Sed() {
	const [ size, setSize ] = useState(window.innerWidth);
	function checkSize() {
		setSize(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', checkSize);

		return () => {
			window.removeEventListener('resize', checkSize);
		};
	});
	return (
		<div>
			<h1>{size} PX</h1>
		</div>
	);
}

const url = 'https://api.github.com/users';
function GetUser() {
	const [ users, setUser ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ isError, setError ] = useState(false);
	async function getusers() {
		const response = await fetch(url);
		const users = await response.json();
		if (response.status > 300) {
			setError(true);
			setIsLoading(false);
		}
		setUser(users);
		setIsLoading(false);
	}
	useEffect(() => {
		getusers();
	}, []);
	if (isLoading) {
		return <h1 className="loading">Loading . . . .</h1>;
	}
	if (isError) {
		return <h1 className="error">Api Error ....</h1>;
	}

	return (
		<div>
			<h1>Git Users</h1>
			<div className="user-block">
				<ul className="user-list">
					{users.map((user) => {
						return (
							<li key={user.id}>
								<img src={user.avatar_url} alt={user.login} className="api-photo" />
								<div>
									<h4>{user.login}</h4>
									<a href={user.html_url}>Profile</a>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CardList />);
