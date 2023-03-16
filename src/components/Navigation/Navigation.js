import React from 'react';
import './Navigation.css';
import logo from './logo.jpg';

const Navigation = ({showRules}) => {
	return(
		<div>
		<div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-between'}}>
			<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', paddingLeft: '20px', width: '75%'}}>
				<h1 className= 'title'> Word Jelly</h1>
				<img src={logo} alt='Logo' width='100'/>
			</div>
			<nav style={{display: 'flex', justifyContent: 'flex-end', width: '25%'}}>
				{showRules && 
				<a href='
				https://word-jelly.netlify.app/rules' target="_blank" rel="noreferrer" className='f5 link dim black underline pa3 pointer'>Rules</a>}
			</nav>
		</div>
		<div style={{paddingLeft: '20px', width: '75%'}}>
		<p className='fw3 f6 pt0 mt0'>An online version of the table top game Letter Jam!</p>
		</div>
		</div>
	);
}
export default Navigation;
