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
		console.log('TOKEN');
		console.log(this.props.token);
		if (this.props.token){
			// this.setState({
			// 	email: this.props.token.email,
			// 	password: this.props.token.password
			// })
			console.log("calling login func");

			document.getElementById("login-btn").click()
			// this.handleLogin();
		}
	}
	handleChage =(event)=> {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleLogin = async (event)=> {
		event.preventDefault()

		
		console.log(event.target);

		let loginData = {}
		if (this.state.email === ''){
			loginData = this.props.token
		}
		else{
			loginData.email = this.state.email
			loginData.password = this.state.password
		}
			

		console.log('loginData=========');
		console.log(loginData);
	
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
      		
      		console.log(parsedResponse);

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
		console.log('render HEADER');
	  	return (
	    	<div className="header">
			    {this.state.logged ? <h2>{this.state.usernameLogged}</h2> : this.loginRegister()}
		    	
		    	{this.state.msg !== '' ? <p>{this.state.msg}</p> : <p></p>}
		    	
	    	</div>
	  	);	
	}
}

export default Header;