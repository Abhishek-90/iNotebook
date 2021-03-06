import React from "react";
import { Link,useLocation } from "react-router-dom";
import { useHistory } from "react-router";

const Navbar = (props) => {
  const location = useLocation().pathname;
  let history = useHistory();

  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    history.push('/login');
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location === '/'? "active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === '/about'? "active":""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem("authToken") ? <div className="d-flex">
              <Link className="btn btn-primary mx-2" role="button" to="/login">Login</Link>
              <Link className="btn btn-primary mx-2" role="button" to="/signup">Signup</Link>
            </div> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
