import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";
import DashBoard from "./pages/DashBoard";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile"; // added
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Home />} />
                <Route path="/projects/new" element={<NewProject />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} /> {/* added */}
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
