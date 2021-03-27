import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext.js";
import './login.css';
import Axios from "axios";

export default function Login(){
	const [email, setEmail] = useState();
	const [pass, setPass] = useState();

	const {setUser} = useContext(UserContext);
	const history = useHistory();

	const submit = async (e) => {
		e.preventDefault();
		const loginUser = {email, pass};

		const loginRes = await Axios.post("http://localhost:8001/users/login", loginUser)
									.catch((error) => {
										console.log(error.message);
										console.log(error.response.data);  
         								console.log(error.response.status);  
         								console.log(error.response.headers);
									});

		setUser({
			token: loginRes.data.token,
			user: loginRes.data.user,
			role: loginRes.data.user.role,
		});



		localStorage.setItem("auth-token", loginRes.data.token);

		//redirecting
		history.push("/");
	}

	const redirect = async (e) => {
		e.preventDefault();

		history.push("/register");
	}

	return (
	  	<div id="log-in">
	  		<div className="auth">
	  			<img className="login-image" src="../../ia_logo.png" alt="ia-logo"></img>

	  			<div className="register-form">
			    	<form onSubmit={submit}>
			    		<label htmlFor="login-email">Email</label>
			    		<input 
			    			id="login-email" 
			    			type="email" 
			    			onChange={ (e) => setEmail(e.target.value)} 
			    		/>

			    		<label htmlFor="login-password">Password</label>
			    		<input 
			    			id="login-password" 
			    			type="password" 
			    			onChange={ (e) => setPass(e.target.value)} 
			    		/>

			    		
			    		<a className="direct-to-reg" onClick={redirect} >Not an Ambassador? Register</a>
			    		<br />
			    		<input id="register-button" type="submit" value="Login" />
			    	</form>
			    </div>
	    	</div>
	    </div>

	);
}