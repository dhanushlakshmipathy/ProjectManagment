import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    const menuRef = useRef(null);
    const location = useLocation();

    // close mobile menu on navigation
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    // close on outside click
    useEffect(() => {
        function onDoc(e) {
            if (!menuRef.current || !btnRef.current) return;
            if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", onDoc);
        return () => document.removeEventListener("click", onDoc);
    }, []);

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="nav-container">
                <Link to="/" className="logo" aria-label="Project Manager home">
                    PM<span className="logo-accent">.</span>
                </Link>

                <div className="nav-search">
                    <input className="nav-search-input" placeholder="Search projects, team..." aria-label="Search" />
                    <button className="nav-search-btn" aria-hidden>🔍</button>
                </div>

                <button
                    ref={btnRef}
                    className={`nav-toggle ${open ? "open" : ""}`}
                    aria-controls="main-nav"
                    aria-expanded={open}
                    aria-label="Toggle navigation"
                    onClick={() => setOpen((s) => !s)}
                >
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                </button>

                <ul
                    id="main-nav"
                    ref={menuRef}
                    className={`nav-links ${open ? "open" : ""}`}
                    role="menubar"
                    aria-hidden={!open && window.innerWidth < 721}
                >
                    <li role="none">
                        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")} role="menuitem">Home</NavLink>
                    </li>
                    <li role="none">
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")} role="menuitem">Dashboard</NavLink>
                    </li>
                    <li role="none">
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")} role="menuitem">Contact</NavLink>
                    </li>
                    <li role="none">
                        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")} role="menuitem">Profile</NavLink>
                    </li>
                </ul>

                <div className="nav-actions">
                    <button className="icon-btn" title="Notifications" aria-label="Notifications">🔔</button>
                    <Link to="/profile" className="avatar-link" aria-label="Your profile">
                        <div className="avatar">AP</div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
