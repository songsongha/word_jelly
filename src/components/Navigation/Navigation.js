import React from 'react';
import './Navigation.css'

const Navigation = () => {
	return(
		<div>
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<a href="https://www.ultraboardgames.com/letter-jam/game-rules.php" target="_blank" rel="noreferrer" className='f3 link dim black underline pa3 pointer'>Rules</a>
			</nav>
			<h1 className= 'title f1 tc'> Word Jelly</h1>
		</div>
	);
}
export default Navigation;
