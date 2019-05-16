import React from 'react';
import Group from './group'


class User extends React.Component {
	constructor(props){
		super()
		this.state={
			groupName:'',
		}
	}
	componentDidMount(){
		// this.getUserData()
	}
	handleChanged = (e)=>{
		
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
		
	}
	handleNameGroup = (e)=>{
		e.preventDefault();
		//makes input visible so then the user can type the name of the group.
		document.querySelector('#nameGroup').style.visibility='visible'
	}
	handleCreateGroup = async (e) => {
		
	    e.preventDefault();
	    try{
		    // to create a group we need to pass the Id of the user logged in this.props.userLoggedId
		    const createGroup = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/groups/new', {
			    method: 'POST',
			    credentials: 'include',
			    body: JSON.stringify({
			    	name: this.state.groupName,
			    	userId:this.props.userLoggedId
			    }),
			    headers:{
			    	'Content-Type': 'application/json'
			    }
		    });

		    const parsedResponse = await createGroup.json();

		    this.props.getUserData()
		    
		    document.querySelector('#nameGroup').style.visibility='hidden'
		    
	    } 
	    catch(err){
	    	console.log(err);
	    }
	}
	handleDeleteAccount = async (e) => {
		
	    e.preventDefault();
	}
	render(){
		console.log('render USER');
	  return (
	    <div className="userContainer">
	    	<div className='userMenu'>
	    		<form>
		    		<input type='submit' onClick={this.handleNameGroup} value='CREATE GROUP'/>

		    		<div id='nameGroup'>
		    			<input type='text' name='groupName'value={this.state.groupName} onChange={this.handleChanged}/>
		    			<input type='submit' onClick={this.handleCreateGroup} value='CREATE'/>		    		
		    		</div>
		    		<input type='submit' onClick={this.handleDeleteAccount} value='DELETE ACCOUNT'/>
		    	</form>
	    	</div>
	    	<div className='userIndex'>
	    		{this.props.userData.length > 0 ? <Group userData={this.props.userData}/>: null}
	    	</div>
	    </div>
	  );

	}
}

export default User;