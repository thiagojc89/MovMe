import React from 'react';


const Group = (props)=>{

	if (props.userGroups[0].length > 0){

		let groupNames = props.userGroups[0].map((g,i) => {
				return <ul key={i}>{g.name}</ul>
			})
		return(
			<div>
				{groupNames}
			</div>
		)
	}
	else{
		return(
			<p>
				No Groups yet
			</p>
		)
	}
}


export default Group;



