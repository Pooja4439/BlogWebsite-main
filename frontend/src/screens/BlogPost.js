import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import "quill/dist/quill.snow.css";
import { useSelector } from "react-redux";

import "../components/style.css";

const Editor = () => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldContents) => {
        console.log("Text change!");
        console.log(delta);

        let currrentContents = quill.getContents();
        console.log(currrentContents.diff(oldContents));
      });
    }
  }, [quill, Quill]);
};
function BlogPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const authToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });
  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  const handlePublish = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", quill.getText());
    axios({
      // Endpoint to send files
      url: "http://localhost:8000/blog/save/",
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },

      // Attaching the form data
      data: formData,
    })
      .then((res) => {
        navigate("/");
      })

      // Catch errors if any
      .catch((err) => {
        console.log(err.response);
      });
  };
  // console.log(quill.getText());
  // console.log(quill.getContents());

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  /*
   */

  return (
    <div>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <div>
          <div ref={quillRef} />
        </div>

        <Button
          variant="primary"
          onClick={handlePublish}
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            margin: "20px 0px",
          }}
        >
          Publish
        </Button>
      </Form>
    </div>
  );
}

export default BlogPost;
