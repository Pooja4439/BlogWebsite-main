import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../features/User/loginSlice";
import { Navigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.login.error);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.login.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginStart({ username, password }));
    setUsername("");
    setPassword("");
  };
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <Card border="primary " style={{ width: "50%" }} className="mx-auto">
      <Card.Header>
        <h1>Login</h1>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Form.Group controlId="formUsername">
            <Card.Title>
              <Form.Label>Username</Form.Label>
            </Card.Title>
            <Card.Text>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Card.Text>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Card.Title>
              {" "}
              <Form.Label>Password</Form.Label>
            </Card.Title>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          <Card.Footer>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Card.Footer>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
