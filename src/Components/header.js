import React from 'react';


class Header extends React.Component {
	constructor(props){
		super()
		this.state = {
			email:'',
			password:'',
			logged:false,
			usernameLogged:''
		}
	}
	handleChage =(event)=> {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleLogin = async (event)=> {
		event.preventDefault()
		//call API to login
		const loginData = {
			email: this.state.email,
			password: this.state.password
		}
		console.log('just about to call api in my server');
	
		try {
			const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/login', {
		        method: 'POST',
		        credentials: 'include',// on every request we have to send the cookie
		        body: JSON.stringify(loginData),
		        headers: {
		        	'Content-Type': 'application/json'
		    	}
      		});
      		console.log('after fetch');

      		const parsedResponse = await loginResponse.json();

      		console.log('parsedResponse');
		    console.log(parsedResponse);
      		if(parsedResponse.status === 200){

      			this.props.login(parsedResponse.data._id);

		        this.setState({
		        	usernameLogged: parsedResponse.data.firstName,
		        	logged: true

		        })
      		}
    	}
    	catch(err){
    		console.log(err);
    	}

		//set logged status to true if login was success 
	}
	loginRegister = ()=>{
	    return(	
	    	<form className='login-form'>
	    		<input 
	    			type='email' 
	    			name='email' 
	    			placeholder='email'
	    			value={this.state.email}
	    			onChange={this.handleChage}/>
	    			<br/>
	    		<input 
	    			type='password' 
	    			name='password' 
	    			placeholder='password'
	    			value={this.state.password}
	    			onChange={this.handleChage}/>
	    			<br/>
	    		<input 
	    			type='submit' 
	    			value='Login'
	    			onClick={this.handleLogin}/>
	    		<input 
	    			type='submit' 
	    			value='Register'
	    			onClick={this.handleRegister}/>	    			
	    	</form>
	    	);
	}
	render(){		
	  	return (
	    	<div className="header">
		    	<nav>
			    	<button>LOGO</button>
			    	<button>MOVIES</button>
			    	<button>GROUPS</button>
			    	<button>ABOUT</button>
			    </nav>
			    {this.state.logged ? <h2>{this.state.usernameLogged}</h2> : this.loginRegister()}
	    	</div>
	  	);	
	}
}

export default Header;