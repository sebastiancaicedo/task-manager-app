import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { UserProvider } from "./containers/UserContext";
import PrivateRoute from "./containers/PrivateRoute";
import NavUser from "./containers/NavUser";

const Home = React.lazy(() => import("./pages/Home"));
const CreateTask = React.lazy(() => import("./pages/CreateTask"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Signup = React.lazy(() => import("./pages/Signup"));
const EditTask = React.lazy(() => import("./pages/EditTask"));

export default function App() {
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
            <Nav>
              <NavUser />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
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
                <Route
                  path="*"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </React.Suspense>
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}
