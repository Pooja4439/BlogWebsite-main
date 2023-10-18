import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    axios({
      // Endpoint to send files
      url: "http://localhost:8000/auth/register/",
      method: "POST",
      headers: {},

      // Attaching the form data
      data: formData,
    })
      .then((res) => {
        console.log("res.data.username");
      })

      // Catch errors if any
      .catch((err) => {
        setError(err.response.data.username);
        return;
      });

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };
  return (
    <Card border="primary " style={{ width: "50%" }} className="mx-auto">
      <Card.Header>
        <h1>Register</h1>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <div className="text-danger">{error}</div>}
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

          <Form.Group controlId="formEmail">
            <Card.Title>
              {" "}
              <Form.Label>Email</Form.Label>
            </Card.Title>
            <Card.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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

          <Form.Group controlId="formConfirmPassword">
            <Card.Title>
              {" "}
              <Form.Label>Confirm Password</Form.Label>
            </Card.Title>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </Form.Group>

          <Card.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;
