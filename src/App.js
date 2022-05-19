import React, { useContext } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { clearSession } from './auth';
import PrivateRoute from './containers/PrivateRoute';
import UserContext, { UserProvider } from './containers/UserContext';

import Header from './containers/Header';
const Home = React.lazy(() => import('./pages/Home'));
const CreateTask = React.lazy(() => import('./pages/CreateTask'));
const Signin = React.lazy(() => import('./pages/Signin'));
const Signup = React.lazy(() => import('./pages/Signup'));
const EditTask = React.lazy(() => import('./pages/EditTask'));

export default function App() {
  const { user, setUser = null } = useContext(UserContext);
  const navigate = useNavigate();

  function onSignOut(event) {
    event.preventDefault();

    setUser(null);
    clearSession();
    navigate('/');
  }

  return (
    <UserProvider>
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
            {user ? (
              <>
                <Link to="/profile" className="nav-link">
                  @{user.email}
                </Link>
                <Nav.Link className="nav-link" onClick={onSignOut}>
                  Sign Out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav>
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                  <Link to="/signin" className="nav-link">
                    Sign In
                  </Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks/:id" element={<EditTask />} />
                <Route
                  path="/tasks/create"
                  element={
                    <PrivateRoute>
                      <CreateTask />
                    </PrivateRoute>
                  }
                />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </React.Suspense>
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}
