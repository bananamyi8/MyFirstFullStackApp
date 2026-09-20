import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                📝 TaskMate
            </div>

            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}

export default Navbar;