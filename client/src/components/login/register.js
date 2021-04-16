import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext.js";
import "./login.css";
import Axios from "axios";
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { TextField } from 'final-form-material-ui';
import { Grid, Paper, InputAdornment, Link, Button } from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 

const validate = (values) => {
	const errors = {}; 
	return errors;
  };


export default function Register(){
	const [email, setEmail] = useState();
	const [pass, setPass] = useState();
	const [checkPassword, setCheckPassword] = useState();
	const [userName, setUserName] = useState();

	const {setUser} = useContext(UserContext);
	const history = useHistory();

	const submit = async (e) => {
		e.preventDefault();
		console.log("clicked on submit in register");

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
			<Grid
			container
			xs={12}
			alignContent="center"
			justify="center"
			style={{ width: "50vh", margin: "auto" }}
			>
			<Grid container xs={12} alignContent="center" justify="center">
				<img className="login-image" src="../../ia_logo.png" alt="ia-logo"></img>
			</Grid>
			<Grid container xs={12} alignContent="center" justify="center">
				<Paper style={{ padding: 16 }}>
				<Form
        			validate={validate}
					onSubmit={submit}
        			render={() => (	
					<form onSubmit={submit}>
						<Field
							fullWidth
							required
							variant="outlined"
							name="user"
							component={TextField}
							label="Username"
							style={{ marginBottom: 8}}
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<PersonOutlineOutlinedIcon />
								</InputAdornment>
							),
							}}
                  		/>
						<OnChange name="user">
							{(e) => setUserName(e)}
						</OnChange>  
						<Field
							fullWidth
							required
							variant="outlined"
							name="email"
							component={TextField}
							type="email"
							label="Email"
							style={{ marginBottom: 8}}
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<EmailOutlinedIcon />
								</InputAdornment>
							),
							}}
                  		/>
						<OnChange name="email">
							{(e) => setEmail(e)}
						</OnChange>  
						<Field
							fullWidth
							required
							variant="outlined"
							name="pass"
							component={TextField}
							type="password"
							label="Password"
							style={{ marginBottom: 8}}
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlinedIcon />
								</InputAdornment>
							),
							}}
                  		/>
						<OnChange name="pass">
							{(e) => setPass(e)}
						</OnChange>  
						<Field
							fullWidth
							required
							variant="outlined"
							name="checkPass"
							component={TextField}
							type="password"
							label="Confirm Password" 
							style={{ marginBottom: 8}}
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlinedIcon />
								</InputAdornment>
							),
							}}
                  		/>
						<OnChange name="checkPass">
							{(e) => setCheckPassword(e)}
						</OnChange>    

						<Grid container xs={12} alignItems="center">
						<Grid item xs={6}>
						</Grid>
						<Grid item xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
							<Button item style={{backgroundColor: '#62d98a', color: "black"}}
							variant="contained"
							color="primary"
							type="submit"
							value="Register"
							>
							Register
							</Button>
						</Grid>
						</Grid>      
					</form>
					)}
					/>
				</Paper>
			</Grid>
		</Grid>
	  	// <div id="log-in">
	  	// 	<div className="auth">
	  	// 		<img className="login-image" src="../../ia_logo.png" alt="ia-logo"></img>

	  	// 		<div className="register-form">
		// 	    	<form onSubmit={submit}>

		// 		    	<label htmlFor="register-userName">User Name</label>	    	
		// 		    	<input 
		// 	    			id="register-userName" 
		// 	    			type="text" 
		// 	    			onChange={ (e) => setUserName(e.target.value)} 
		// 	    		/>

		// 	    		<br />

		// 	    		<label htmlFor="register-email">Email</label>
		// 	    		<input 
		// 	    			id="register-email" 
		// 	    			type="email" 
		// 	    			onChange={ (e) => setEmail(e.target.value)} 
		// 	    		/>

		// 	    		<br />

		// 	    		<label htmlFor="register-password">Password</label>
		// 	    		<input 
		// 	    			id="register-password" 
		// 	    			type="password" 
		// 	    			onChange={ (e) => setPass(e.target.value)} 
		// 	    		/>

		// 	    		<br />

		// 	    		<label htmlFor="register-password">Verify Password</label>
		// 	    		<input 
		// 	    			id="register-checkpassword" 
		// 	    			type="password" 
		// 	    			onChange={ (e) => setCheckPassword(e.target.value)} 
		// 	    		/>

		// 	    		<br />
		// 	    		<input id="register-button" type="submit" value="Register" />
		// 	    	</form>
		// 	    </div>
	    // 	</div>
	    // </div>

	)
	
}
