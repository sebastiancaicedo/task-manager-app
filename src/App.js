import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const Create = React.lazy(() => import("./pages/Create"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Signup = React.lazy(() => import("./pages/Signup"));
const SingleTask = React.lazy(() => import("./pages/SingleTask"));

export default function App() {
  return (
    <>
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
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks/:id" element={<SingleTask />} />
                <Route path="/create" element={<Create />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </React.Suspense>
          </Col>
        </Row>
      </Container>
    </>
  );
}
