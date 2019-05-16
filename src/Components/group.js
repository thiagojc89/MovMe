import React from 'react';


const Group = (props)=>{
	console.log('props inside of the group component');
	console.log(props);
	 
		const groupNames = props.userData[0].group.map((g,i) => {
			return <li key={i}>{g.name}</li>
		})
		// console.log(props);
	 


	
	return(
		<ul>
			{groupNames}
		</ul>
	)
}


export default Group;



