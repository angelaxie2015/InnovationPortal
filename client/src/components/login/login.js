import React, { useState } from 'react'
import './login.css'

class Login extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {value: ''};
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
	    this.setState({value: event.target.value});
    }

	handleSubmit(event) {
	    alert('A name was submitted: ' + this.state.value);
	    event.preventDefault();
	}

	render() {
	  return (
	  	<div id="log-in">
	  		<div>
	  			<img class="login-image" src="../../ia_logo.png"></img>
	    		<h1>Login</h1>

		    	<div>
		    		Hello
		    	</div>


		    	 <form onSubmit={this.handleSubmit}>
	        		<label> Name:
	          			<input type="text" value={this.state.value} onChange={this.handleChange} />
	        		</label>
	        		<input type="submit" value="Submit" />
	        	</form>

	    	</div>
	    </div>

	  )
	}
}

export default Login;