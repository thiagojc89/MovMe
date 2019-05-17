import React from 'react';
import linkedin from './LinkedIn-Blue-logo.png'
import github from './GitHub_Logo.png'

function Footer() {
  return (
    <div className="footer">
    	<div id="credit">
	    	<spam>create by: Thiago Cavalcante</spam>
	    		<div>
	    		
					<a href="https://github.com/thiagojc89">
						<img class='footer-img' src={github}/>
					</a> 
					<a href="https://www.linkedin.com/in/thiagojc89/">
						<img class='footer-img' src={linkedin}/>
					</a>
				</div>
		</div>
    	<img alt='' src='https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png'/>
    </div>
  );
}

export default Footer;