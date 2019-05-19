import React from 'react';


class Edit extends React.Component {
	constructor(){
		super()
		this.state={
			firstName: '',
			lastName: '',
			password: '',
			email: ''
		}
	}
	componentDidMount(){
		this.setState({
			firstName: this.props.userData.firstName,
			lastName: this.props.userData.lastName,
			email: this.props.userData.email
		})
	}
	handleChanged = (e)=>{
		
		
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
		
	}
	handleSubmit = async (e) => {
	    e.preventDefault();

	    const userNewInfor = {}
	    userNewInfor.firstName = this.state.firstName
	    userNewInfor.lastName = this.state.lastName
	    userNewInfor.email = this.state.email
	    userNewInfor.password = this.state.password

	      try{
			    const editResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/' + this.props.userData._id, {
				      method: 'PUT',
				      credentials: 'include',
				      body: JSON.stringify(userNewInfor),
				      headers:{
				        'Content-Type': 'application/json'
				        }
			    });

			    const parsedResponse = await editResponse.json();
			    
			    if (parsedResponse.status === 200){
			    	console.log('update user info');
			    	
			    	this.props.showMovieList()
					this.props.showUser(true)
					this.props.editClose(this.state.email,this.state.password)
					// this.props.getUserData()

			    }
			    else{
			    	console.log('error in edit user');
			    }	
	      }
	      catch(err){
	      		console.log(err);
	      }
  	}
	render(){
	  return (
	    <div className='registerContainer'>
	    	<form className='registerForm' onSubmit={this.handleSubmit}>
	    	<h1>Edit User Info</h1>
	    		First Name: <input 
		    		type='text'
		    		name='firstName' 
		    		value={this.state.firstName} 
		    		onChange={this.handleChanged}
		    		placeholder='firstName'/>
		    		<br/>
	    		last Name: <input 
		    		type='text'
		    		name='lastName' 
		    		value={this.state.lastName} 
		    		onChange={this.handleChanged}
		    		placeholder='lastName'/>
		    		<br/>
	    		e-mail: <input 
	    		   type='email'
	    		   name='email' 
	    		   value={this.state.email} 
	    		   onChange={this.handleChanged}
	    		   placeholder='email'/>
	    		   <br/>
	    		   <br/>
	    		   <br/>
	    		Confirm Password: <input 
		    		type='password'
		    		name='password' 
		    		value={this.state.password} 
		    		onChange={this.handleChanged}
		    		placeholder='password'/>
		    		<br/>
		    	<button>Save changes</button>
		    	<br/>
	    	</form>
	    </div>
	  );

	}
}

export default Edit;



