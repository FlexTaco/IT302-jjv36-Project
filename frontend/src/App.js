//joffre villacis
//nov 18, 2024
//it302, section 451
//phase 4
//jjv36@njit.edu
import "./App.css";
import React, { useState, useCallback } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddComment from "./components/addComment";
import JobsList from "./components/jobsList";
import Jobs from "./components/jobs";
import Login from "./components/login";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const loginSetter = useCallback(
    (user) => {
      setUser(user);
    },
    [setUser]
  );

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary" bg="light">
        <Navbar.Brand>Jobs List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/jjv36_jobs"}>
              Jobs
            </Nav.Link>
            <Nav.Link as={NavLink} to={user ? "" : "/jjv36_login"}>
              {user ? "Logout User" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<JobsList />}></Route>
        <Route path="/jjv36_jobs" element={<JobsList />}></Route>
        <Route path="/jjv36_jobs/:id/" element={<Jobs user={user} />}></Route>
        <Route
          path="/jjv36_jobs/:id/comment"
          element={<AddComment user={user} />}
        ></Route>

        <Route
          path="/jjv36_login"
          element={<Login user={user} loginSetter={loginSetter}></Login>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
