import React from 'react';


class Group extends React.Component{
	constructor(){
		super()
	}
	componentDidMount(){

    	this.getGroups()

  	}
	getGroups = async ()=>{

		try{
	    	console.log('PROPS', this.props);
		    // to create a group we need to pass the Id of the user logged in this.props.userLoggedId
		    const userData = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/groups/'+this.props.userLoggedId)


		    console.log('=========after get houte=========', userData)
		    
		    const parsedResponse = await userData.json();
		    
		    console.log('parsedResponse=====>',parsedResponse);

		    // return(<h2>teste</h2>)
		    
	    } 
	    catch(err){
	    	console.log(err);
	    }
	}
	render(){

		return(
			<h2>teste</h2>
		)
	}

}


export default Group;



