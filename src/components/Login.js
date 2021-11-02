import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
	const history = useHistory();
	const [credentials, setCredentials] = useState({email:"",password:""});
	
	const onchange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e)=>{
		e.preventDefault();
		// console.log(credentials);
		const response = await fetch(
			'http://localhost:5000/auth/login',{
				method: 'POST',
				headers:{
					"Content-Type": "application/json",
				},
				body:JSON.stringify(credentials),
			}
		)

		const json = await response.json();
		if(json.success){
			localStorage.setItem('authToken',json.authtoken);
			history.push('/'); 
		}
		else{
			alert('Invalid Credentials');
		}
	}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
			value={credentials.email}
            aria-describedby="emailHelp"
			name="email"
			onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
			value={credentials.password}
			name="password"
			onChange={onchange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
