import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import team_logo from "../../assets/team_logo.jpg"
import { isAuthenticated, getUsername, clearJWT } from "../auth/auth-helper";


const Header = () => {

  const location = useLocation();

  const signoutClick = () => {
    clearJWT();
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
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
                <Link className='nav-link dropdown-toggle' to="#" role="button" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-barcode"></i> Ad
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/ad/list">
                      <i className="fa-regular fa-rectangle-list"></i> Ad List
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
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Header;

