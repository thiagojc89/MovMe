import React from 'react';


class Header extends React.Component {
	constructor(props){
		super()
		this.state = {
			email:'',
			password:'',
			logged:false,
			usernameLogged:null,
			msg : ''
		
		}
	}
	componentDidMount(){

		if (this.props.token){

			document.getElementById("login-btn").click()
			
		}
	}
	handleChage =(event)=> {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleLogin = async (event)=> {
		event.preventDefault()

		let loginData = {}
		if (this.state.email === ''){
			loginData = this.props.token
		}
		else{
			loginData.email = this.state.email
			loginData.password = this.state.password
		}
	
		try {
			const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/login', {
		        method: 'POST',
		        credentials: 'include',
		        body: JSON.stringify(loginData),
		        headers: {
		        	'Content-Type': 'application/json'
		    	}
      		});
      		
      		const parsedResponse = await loginResponse.json();

      		if(parsedResponse.status === 200){

      			this.props.login(parsedResponse.data._id);
      			this.props.getUserData();
		        this.setState({
		        	usernameLogged: parsedResponse.data.firstName,
		        	logged: true
		        })
      		}
      		if (parsedResponse.status === 300){
      			this.setState({
      				msg: 'Invalid User/Password'
      			})
      		}
      		else{
      			 this.setState({
      				msg: null
      			})
      		}
    	}
    	catch(err){
    		console.log(err);
    	}

		//set logged status to true if login was success 
	}
	handleRegister = (e)=>{
		e.preventDefault()
		this.props.renderRegister()
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
	    			id='login-btn' 
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
			    {this.state.logged ? <h2>{this.state.usernameLogged}</h2> : this.loginRegister()}
		    	
		    	{this.state.msg !== '' ? <p>{this.state.msg}</p> : <p></p>}
		    	
	    	</div>
	  	);	
	}
}

export default Header;