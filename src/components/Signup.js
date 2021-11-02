import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
	if(credentials.password === credentials.cpassword){
		const response = await fetch("http://localhost:5000/auth/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: credentials.name,
			email: credentials.email,
			password: credentials.password,
		}),
		});
		const json = await response.json();
		if (json.success) {
		  localStorage.setItem("authToken", json.authtoken);
		  history.push("/");
		  props.showAlert("Signup Successful!", "success");
		} else {
		  props.showAlert(json.errorMessage, "danger");
		}
	}
	else{
		props.showAlert("Password Does not Match", "danger");
	}

  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={4}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
            minLength={8}
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
            name="password"
            onChange={onChange}
            minLength={8}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={8}
            required
          />
        </div>
        <button
          disabled={
            credentials.name.length < 4 ||
            credentials.email.length < 8 ||
            credentials.password.length < 8 ||
            credentials.cpassword.length < 8
          }
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
