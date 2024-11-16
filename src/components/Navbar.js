import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = ({ userName }) => {
  return (
    <nav className="navbar bg-blue-800 text-white py-4 px-8 shadow-lg">
      <div className="navbar-container flex justify-between items-center">
        <h1 className="navbar-title text-2xl font-bold">Book Exchange Platform</h1>
        <div className="navbar-links flex space-x-6">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/booklist" className="navbar-link">Book List</Link>
          <Link to="/addbook" className="navbar-link">Add Books</Link>
          <Link to="/request" className="navbar-link">Incoming Requests</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/register" className="navbar-link">Register</Link>
        </div>
        {userName && (
          <div className="user-name text-lg">
            Welcome, {userName}!
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;