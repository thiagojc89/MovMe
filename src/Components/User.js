import React from 'react';


class User extends React.Component {
	constructer(props){

	}
	handleCreateGroup = async (e) => {
		
	    e.preventDefault();
	    try{
	    	console.log(this.props);
		    // to create a group we need to pass the Id of the user logged in this.props.userLoggedId
		    const createGroup = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/groups/new', {
			    method: 'POST',
			    credentials: 'include',
			    body: JSON.stringify({userId:this.props.userLoggedId}),
			    headers:{
			    	'Content-Type': 'application/json'
			    }
		    });

		    const parsedResponse = await createGroup.json();
		    
		    console.log(parsedResponse);
	    } 
	    catch(err){
	    	console.log(err);
	    }
	    // if(parsedResponse.data === 'login successful'){
	    //   this.props.history.push('/movies');
	    // }
	}
	handleDeleteAccount = async (e) => {
		
	    e.preventDefault();
	}
	render(){
	  return (
	    <div className="userContainer">
	    	<div className='userMenu'>
	    		<form>
		    		<input type='submit' onClick={this.handleCreateGroup} value='CREATE GROUP'/>
		    		<input type='submit' onClick={this.handleDeleteAccount} value='DELETE ACCOUNT'/>
		    	</form>
	    	</div>
	    	<div className='userIndex'>
	    		<p>GROUP NAME</p>
	    		<ul>
	    			<li>Movie</li>
	    			<li>Movie</li>
	    			<li>Movie</li>
	    			<li>Movie</li>
	    		</ul>
	    	</div>
	    </div>
	  );

	}
}

export default User;