import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext.js";

export default function LogNav() {
	const { user, setUser } = useContext(UserContext);
	const history = useHistory();

	const register = () => history.push("/register");
	const login = () => history.push("/login");
	const logout = () => {
		setUser({
			token: undefined,
			user: undefined
		});
	};

	return (
		<div>
			<h1>Hello, LogNav</h1>

			{/* Check if the user has already logged in */}
			
			{ user.user ? 
				(<button onClick={logout}>Log out</button>) : (
					<div>
						<button onClick={login}>Log in</button>
						<button onClick={register}>Register</button>
					</div>
				)

			}


		</div>
	);
}