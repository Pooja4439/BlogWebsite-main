import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Blogs({ blog }) {
  const user = useSelector((state) => state.auth.user);
  const authToken = useSelector((state) => state.auth.token);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const blogClass = isDeleted ? "d-none" : "";

  const handleDelete = (id) => {
    setShowConfirmation(false);
    axios({
      // Endpoint to send files
      url: `http://localhost:8000/blog/delete/${id}/`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => {
        console.log("Successfully deleted");
      })

      // Catch errors if any
      .catch((err) => {
        console.log(err.response);
        return;
      });
    setIsDeleted(true);
    console.log(id, user);
  };

  return (
    <div className={blogClass}>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h2>
              <Link to={`/blog/${blog.id}`} style={{ color: "black" }}>
                {blog.title}
              </Link>
              {user === blog.author_name && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setShowConfirmation(true)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Button>
              )}
            </h2>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            By{" "}
            <Link to={`/user/${blog.author}`} style={{ color: "gray" }}>
              {blog.author_name}
            </Link>
          </Card.Subtitle>
          <Card.Text>{blog.body}</Card.Text>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(blog.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Blogs;
