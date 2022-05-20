import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';
import { UserProvider } from './containers/UserContext';

import Header from './containers/Header';
const Home = React.lazy(() => import('./pages/Home'));
const CreateTask = React.lazy(() => import('./pages/CreateTask'));
const Signin = React.lazy(() => import('./pages/Signin'));
const Signup = React.lazy(() => import('./pages/Signup'));
const EditTask = React.lazy(() => import('./pages/EditTask'));

export default function App() {
  return (
    <UserProvider>
      <Header />
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
