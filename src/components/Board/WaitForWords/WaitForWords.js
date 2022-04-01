import React from 'react';

const WaitForWords= ({players}) => {
    const waitTable = players.map((player,index) =>{
		const {name, submittedWord} = player

		return(
			<tr key={index}>
				<td className='ph3'>{name}</td>
				<td className={`${submittedWord ? 'green': ''}`}>{submittedWord ? 'Ready' : 'Not yet joined'}</td>
			</tr>
		)  
	})
return (
    <div className='tc'>
			Waiting for other players join and enter words
			<table id='wait' className='center pt4'>
				<tbody>
					<tr>
						<th key='player'className='ph3'>Player</th>    
						<th key='ready'className='ph3'>Status</th>
					</tr>
				{waitTable}
				</tbody>
			</table>
		</div>
    )
}
export default WaitForWords