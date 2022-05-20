import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { clearSession } from '../auth';
import UserContext from './UserContext';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function onSignOut(event) {
    event.preventDefault();

    setUser(null);
    clearSession();
    navigate('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          Task List
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/tasks/create" className="nav-link">
              Create
            </Link>
          </Nav>
          {!user ? (
            <Nav>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            </Nav>
          ) : (
            <>
              <Link to="/profile" className="nav-link">
                @{user.email}
              </Link>
              <Nav.Link className="nav-link" onClick={onSignOut}>
                Sign Out
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
