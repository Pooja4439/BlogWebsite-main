import React, { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";

import axios from "axios";

function UserPosts() {
  const id = useParams();
  const pk = id.id;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authToken = useSelector((state) => state.auth.token);

  const [blogs, setBlogs] = useState([]); // State to store the fetched blogs
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(1);
  useEffect(() => {
    fetchBlogs();
  }, [authToken, currentPage, pk]);

  const fetchBlogs = () => {
    axios({
      url: `http://localhost:8000/blog/getuserblogs/${pk}/?page=${currentPage}`,
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => {
        setitemsPerPage(res.data.page_size);
        setBlogs(res.data.results);
        setTotalBlogs(res.data.count);
      })
      .catch((err) => {
        return <Navigate to="/" />;
      });
  }; // Include authToken as a dependency to refetch data when the token changes

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default UserPosts;
