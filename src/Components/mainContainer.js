import React from 'react';


class Maincontainer extends React.Component {
	
	render(){
	  return (
	    <div className="mainContainer">
	    	{this.props.movies}
	    </div>
	  );

	}
}

	    	// {this.props.getMovies()}
export default Maincontainer;