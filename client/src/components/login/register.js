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
		await Axios.post("http://localhost:8001/users/register", newUser).catch((error) => {
										console.log(error.message);
										console.log(error.response.data);  
         								console.log(error.response.status);  
         								console.log(error.response.headers);
									});

		console.log("in register");

		const loginRes = await Axios.post("http://localhost:8001/users/login", {email, pass}).catch((error) => {
										console.log(error.message);
										console.log(error.response.data);  
         								console.log(error.response.status);  
         								console.log(error.response.headers);
									});
		
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
	  		<div className="auth">
	  			<img className="login-image" src="../../ia_logo.png" alt="ia-logo"></img>

	  			<div className="register-form">
			    	<form onSubmit={submit}>

				    	<label htmlFor="register-userName">User Name</label>	    	
				    	<input 
			    			id="register-userName" 
			    			type="text" 
			    			onChange={ (e) => setUserName(e.target.value)} 
			    		/>

			    		<br />

			    		<label htmlFor="register-email">Email</label>
			    		<input 
			    			id="register-email" 
			    			type="email" 
			    			onChange={ (e) => setEmail(e.target.value)} 
			    		/>

			    		<br />

			    		<label htmlFor="register-password">Password</label>
			    		<input 
			    			id="register-password" 
			    			type="password" 
			    			onChange={ (e) => setPass(e.target.value)} 
			    		/>

			    		<br />

			    		<label htmlFor="register-password">Verify Password</label>
			    		<input 
			    			id="register-checkpassword" 
			    			type="password" 
			    			onChange={ (e) => setCheckPassword(e.target.value)} 
			    		/>

			    		<br />
			    		<input id="register-button" type="submit" value="Register" />
			    	</form>
			    </div>
	    	</div>
	    </div>

	)
	
}


