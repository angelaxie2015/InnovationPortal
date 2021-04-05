import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext.js";
import './login.css';
import Axios from "axios";
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Grid, Paper, InputAdornment, Link, Button } from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
  
  const validate = (values) => {
	const errors = {};
	if (!values.pass) {
	  errors.pass = 'Required';
	}
	if (!values.email) {
	  errors.email = 'Required';
	}
	return errors;
  };

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
			user: loginRes.data.user 
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
		<Grid container alignItems="center" class="login-register-body">
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
							variant="filled"
							name="email"
							component={TextField}
							type="email"
							label="Email"
							onChange={ (e) => setEmail(e.target.value)} 
							style={{ marginBottom: 8}}
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<EmailOutlinedIcon />
								</InputAdornment>
							),
							}}
                  		/>
						<Field
							fullWidth
							required
							variant="filled"
							name="pass"
							component={TextField}
							type="email"
							label="Email"
							onChange={ (e) => setPass(e.target.value)}  
							style={{ marginBottom: 8}}
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<LockOutlinedIcon />
								</InputAdornment>
							),
							}}
                  		/>
					<Grid container xs={12} alignItems="center">
						<Grid item xs={6}>
							<Link href="#" onClick={redirect}>
								Not an Ambassador? Register
							</Link>
						</Grid>
						<Grid item xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
							<Button item style={{backgroundColor: '#62d98a', color: 'black'}}
							variant="contained"
							color="primary"
							type="submit"
							value="Login"
							>
							Submit
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
		// 	    		<label htmlFor="login-email">Email</label>
		// 	    		<input 
		// 	    			id="login-email" 
		// 	    			type="email" 
		// 	    			onChange={ (e) => setEmail(e.target.value)} 
		// 	    		/>

		// 	    		<label htmlFor="login-password">Password</label>
		// 	    		<input 
		// 	    			id="login-password" 
		// 	    			type="password" 
		// 	    			onChange={ (e) => setPass(e.target.value)} 
		// 	    		/>

			    		
		// 	    		<a className="direct-to-reg" onClick={redirect} >Not an Ambassador? Register</a>
		// 	    		<br />
		// 	    		<input id="register-button" type="submit" value="Login" />
		// 	    	</form>
		// 	    </div>
	    // 	</div>
	    // </div>

	);
}