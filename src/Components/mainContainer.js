import React from 'react';


class Maincontainer extends React.Component {
	
	render(){
	  return (
	    <div className="mainContainer">
	    	{this.props.movies}
	    	<button onClick={this.props.getMovies.bind(null,this.props.page + 1)}>
	    		More Movies
	    	</button>
	    </div>
	  );

	}
}

	    	// {this.props.getMovies()}
export default Maincontainer;