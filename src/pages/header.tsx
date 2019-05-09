import * as React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return <div className="auth-page">
            <nav className="navbar navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="index.html">conduit</a>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link active">&nbsp;Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/settings"} className="nav-link">&nbsp;New Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/settings"} className="nav-link">&nbsp;Settings</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">Sign in</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link " >Sign up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/profile/Delete"} className="nav-link " >Go to profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <footer>
                <div className="container">
                    <a href="/" className="logo-font">conduit</a>
                    <span className="attribution">
                        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
                </div>
            </footer>
        </div>
    }
}

export { Header };