import React from 'react';
import './Navigation.css';
import logo from './logo.jpg';

const Navigation = () => {
	return(
		<div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-between', marginBottom: '40px'}}>
			<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', paddingLeft: '20px', width: '75%'}}>
				<h1 className= 'title'> Word Jelly</h1>
				<img src={logo} alt='Logo' width='100'/>
			</div>
			<nav style={{display: 'flex', justifyContent: 'flex-end', width: '25%'}}>
				<a href="https://www.ultraboardgames.com/letter-jam/game-rules.php" target="_blank" rel="noreferrer" className='f3 link dim black underline pa3 pointer'>Rules</a>
			</nav>
		</div>
	);
}
export default Navigation;
