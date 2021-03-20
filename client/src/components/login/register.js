import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext.js";
import './login.css';
import Axios from "axios";

export default function Register(){
	const [email, setEmail] = useState();
	const [pass, setPass] = useState();
	const [checkPassword, setCheckPassword] = useState();
	const [userName, setUserName] = useState();

	const {setUser} = useContext(UserContext);
	const history = useHistory();

	const submit = async (e) => {
		e.preventDefault();
		const newUser = {email, pass, checkPassword, userName};
		await Axios.post("http://localhost:8001/users/register", newUser);

		console.log("in register");

		const loginRes = await Axios.post("http://localhost:8001/users/login", {email, pass});
		
		setUser({
			token: loginRes.data.token,
			user: loginRes.data.user 
		});

		localStorage.setItem("auth-token", loginRes.data.token);

		//redirecting
		history.push("/");
	}

	return (
	  	<div id="log-in">
	  		<div>
	  			<img className="login-image" src="../../ia_logo.png" alt="ia-logo"></img>
	    		<h1>Register</h1>

		    	<div>
		    		Hello Register
		    	</div>

		    	<form onSubmit={submit}>
		    		<label htmlFor="register-email">Email</label>
		    		<input 
		    			id="register-email" 
		    			type="email" 
		    			onChange={ (e) => setEmail(e.target.value)} 
		    		/>

		    		<label htmlFor="register-password">Password</label>
		    		<input 
		    			id="register-password" 
		    			type="password" 
		    			onChange={ (e) => setPass(e.target.value)} 
		    		/>

		    		<label htmlFor="register-password">Verify Password</label>
		    		<input 
		    			id="register-password" 
		    			type="password" 
		    			onChange={ (e) => setCheckPassword(e.target.value)} 
		    		/>

		    		<label htmlFor="register-userName">User Name</label>
		    		<input 
		    			id="register-userName" 
		    			type="text" 
		    			onChange={ (e) => setUserName(e.target.value)} 
		    		/>

		    		<input type="submit" value="Register" />
		    	</form>

	    	</div>
	    </div>

	)
	
}


