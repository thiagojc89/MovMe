import React from 'react';


class User extends React.Component {
	render(){
	  return (
	    <div className="userContainer">
	    	<div className='userMenu'>
	    		<p>CREATE GROUP</p>
	    		<p>DELETE ACOUNT</p>
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