import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import team_logo from "../../assets/team_logo.jpg"
import { isAuthenticated, getUsername, clearJWT,getUserId } from "../auth/auth-helper";
import backgroundImage from '../../assets/background.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {  

  const location = useLocation();

  const signoutClick = () => {
    clearJWT();
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark custom-navbar" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '1px solid #ff0000',
        position: 'relative',
        boxShadow: '0 3px 10px rgba(255, 0, 0, 0.6)'
      }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={team_logo} alt="logo" style={{ width: 40 }} />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <i className="fas fa-home"></i> Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className='nav-link dropdown-toggle' to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-barcode"></i> Ad
                </Link>
                <ul className="dropdown-menu" style={{backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                  <li>
                    <NavLink className="dropdown-item" to="/ad/list"> 
                      <i className="fa-regular fa-rectangle-list"></i> Ad List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/ad/private">
                      <i className="fa-regular fa-rectangle-list"></i> Private List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/ad/add">
                      <i className="fa-solid fa-square-plus"></i> Add a new Ad
                    </NavLink>
                  </li>
                </ul>
              </li >
              <li className="nav-item">
                {!isAuthenticated() &&
                  <NavLink className="nav-link" to="/users/signin">
                    <i className="fa-solid fa-right-to-bracket"></i> Signin
                  </NavLink>}
                {isAuthenticated() &&
                  <Link className="nav-link" to="/" onClick={signoutClick}>
                    <i className="fa-solid fa-right-from-bracket"></i> Sign-out ({getUsername()})
                  </Link>}
              </li>
              <li className="nav-item">
                {isAuthenticated() &&
                  <Link className="nav-link" to={`/users/editProfile/${getUserId()}`}>
                    <i className="fa-solid fa-user"></i> Edit Profile
                  </Link>}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Header;