import React from 'react';
import './Navigation.css';
import logo from './logo.jpg';

const Navigation = () => {
	return(
		<div>
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<a href="https://www.ultraboardgames.com/letter-jam/game-rules.php" target="_blank" rel="noreferrer" className='f3 link dim black underline pa3 pointer'>Rules</a>
			</nav>
			<div className = 'tc'>
				<h1 className= 'title f1'> Word Jelly</h1>
				<img src={logo} alt="Logo" />
			</div>
		</div>
	);
}
export default Navigation;
