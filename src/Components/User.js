import React from 'react';
import Group from './group'


class User extends React.Component {
	constructor(props){
		super()
		this.state={
			groupName:'',
			userData: []
		}
	}
	componentDidMount(){
		this.getUserData()
	}
	handleChanged = (e)=>{
		console.log(e);
		
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
		
	}
	handleNameGroup = (e)=>{
		e.preventDefault();
		document.querySelector('#nameGroup').style.visibility='visible'
	}
	handleCreateGroup = async (e) => {
		
	    e.preventDefault();
	    try{
	    	console.log(this.props);
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
		    
		    console.log(parsedResponse);
		    document.querySelector('#nameGroup').style.visibility='hidden'
	    } 
	    catch(err){
	    	console.log(err);
	    }
	}
	getUserData = async ()=>{
		try{
    
		    // to create a group we need to pass the Id of the user logged in this.props.userLoggedId
		    const userData = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/groups/'+ this.props.userLoggedId)


		    console.log('=========after get houte=========', userData)
		    
		    const parsedResponse = await userData.json();
		    
		    console.log('parsedResponse=====>',parsedResponse);


		    this.setState({
		    	userData: [...userData,parsedResponse]
		    })
	    
	    } 
	    catch(err){
	    	console.log(err);
	    }
	}
	handleDeleteAccount = async (e) => {
		
	    e.preventDefault();
	}
	render(){
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
	    		{this.props.userLoggedId ? <Group userData={this.state.userData}/>: null}
	    	</div>
	    </div>
	  );

	}
}

export default User;