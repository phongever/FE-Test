import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <p className="h2 navbar-brand">My Blog</p>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create">
            <Button className="btn-primary">New post</Button>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
