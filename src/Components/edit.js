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

	    const editResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/register', {
	      method: 'PUT',
	      credentials: 'include',
	      body: JSON.stringify(this.state),
	      headers:{
	        'Content-Type': 'application/json'
	        }
	    });

	    const parsedResponse = await editResponse.json();
	    
	    if (parsedResponse.status === 200){


	    }
	    else{
	    	console.log('error in edit user');
	    }



  	}
	render(){
		console.log(this.props);
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



