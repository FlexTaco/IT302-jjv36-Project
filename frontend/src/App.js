import "./App.css";
import React, { useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import AddReview from "./components/addReview";
import JobsList from "./components/jobsList";
import Jobs from "./components/jobs";
// import Login from "./components/login";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [user, setUser] = useState(null);

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
            <Nav.Link as={NavLink} to={user ? "" : "/login"}>
              {user ? "Logout User" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<JobsList />}></Route>
        <Route path="/jjv36_jobs" element={<JobsList />}></Route>
        <Route path="/jjv36_jobs/:id/" element={<Jobs user={user} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
