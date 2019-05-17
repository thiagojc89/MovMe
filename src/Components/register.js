import React from 'react';


class Register extends React.Component {
	constructor(){
		super()
		this.state={
			firstName: '',
			lastName: '',
			password: '',
			email: ''
		}
	}
	handleChanged = (e)=>{
		
		
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
		
	}
	handleSubmit = async (e) => {
	    e.preventDefault();

	    const registerResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/register', {
	      method: 'POST',
	      credentials: 'include',
	      body: JSON.stringify(this.state),
	      headers:{
	        'Content-Type': 'application/json'
	        }
	    });

	    const parsedResponse = await registerResponse.json();
	    
	    this.props.loginFromRegister(parsedResponse.data.firstName)
	    this.props.showMovieList()


  	}
	render(){
	  return (
	    <div className='registerContainer'>
	    	<form className='registerForm' onSubmit={this.handleSubmit}>
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
	    		Password: <input 
		    		type='password'
		    		name='password' 
		    		value={this.state.password} 
		    		onChange={this.handleChanged}
		    		placeholder='password'/>
		    		<br/>
		    	<button>Resgiter</button>
		    	<br/>
	    	</form>
	    </div>
	  );

	}
}

export default Register;



