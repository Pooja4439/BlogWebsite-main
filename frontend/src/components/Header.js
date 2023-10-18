import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          BlogPost
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? null : (
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            )}
            {isAuthenticated ? null : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/blogpost">
                Post
              </Nav.Link>
            ) : null}
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/user">
                My Blogs
              </Nav.Link>
            ) : null}
          </Nav>
          {isAuthenticated ? <LogoutButton /> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
