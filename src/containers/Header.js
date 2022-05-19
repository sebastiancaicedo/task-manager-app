import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getSession, isAuthenticated } from "../auth"

export default function Header () {
const { user= {} } = getSession();
return (
<Navbar bg="light" expand="lg">
        <Container>
          <Link to="/" className="navbar-brand">
            Task List
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/create" className="nav-link">
                Create
              </Link>
            </Nav>
            <Nav>
                {isAuthenticated() ? (
                     <>
                       <Link to="/profile" className="nav-link">
                        @{user.email}
                       </Link>
                       <Link to="/signout" className="nav-link">
                       Sign Out
                       </Link>
                    </>
                    ) : (
                     <>
                        <Link to="/signup" className="nav-link">
                         Sign Up
                        </Link>
                        <Link to="/signin" className="nav-link">
                          Sign In
                        </Link>
                     </>
                    )}
                 </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   );
}     