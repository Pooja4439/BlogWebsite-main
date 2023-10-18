import React, { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";

function Blog() {
  const id = useParams();
  const pk = id.id;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authToken = useSelector((state) => state.auth.token);

  const [blogs, setBlogs] = useState([]); // State to store the fetched blogs

  useEffect(() => {
    // Fetch the blogs when the component mounts
    axios({
      url: `http://localhost:8000/blog/getblogs/${pk}`,
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => {
        // Save the fetched blogs to the state
        setBlogs(res.data);
      })
      .catch((err) => {
        return <Navigate to="/" />;
      });
  }, [authToken]); // Include authToken as a dependency to refetch data when the token changes

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-100 p-3">
      {Array.isArray(blogs) ? (
        blogs.map((blog) => (
          <Col key={blog.id} className="w-100 p-3">
            <article>
              <Blogs blog={blog} />
            </article>
          </Col>
        ))
      ) : (
        // Render the Blogs component directly for a single blog object
        <Col className="w-100 p-3">
          <article>
            <Blogs blog={blogs} />
          </article>
        </Col>
      )}
    </div>
  );
}

export default Blog;
