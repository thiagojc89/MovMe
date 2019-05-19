import React from 'react';


class Maincontainer extends React.Component {
	render(){
	  return (
	    <div className="mainContainer">
	    	{this.props.page > 1?
	    	<button className='previuos-btn' onClick={this.props.getMovies.bind(null,this.props.page - 1 )}>
	    		previuos Page
	    	</button>:null}


	    	<button onClick={this.props.getMovies.bind(null,this.props.page + 1)}>
	    		Next Page
	    	</button>
	    	<div id='movieGrid'>
	    		{this.props.movies}
	    	</div>
	    	<button className='previuos-btn' onClick={this.props.getMovies.bind(null,this.props.page - 1 )}>
	    		previuos Page
	    	</button>
	    	<button onClick={this.props.getMovies.bind(null,this.props.page + 1)}>
	    		Next Page
	    	</button>
	    </div>
	  );
	}
}

	    	
export default Maincontainer;