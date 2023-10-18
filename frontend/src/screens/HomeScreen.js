import React, { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import axios from "axios";

function HomeScreen() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authToken = useSelector((state) => state.auth.token);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]); // State to store the fetched blogs
  const [itemsPerPage, setitemsPerPage] = useState(1);
  useEffect(() => {
    fetchBlogs();
  }, [authToken, currentPage]);

  const checkLogin = () => {};
  const fetchBlogs = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // Fetch the blogs when the component mounts
    axios({
      url: `http://localhost:8000/blog/getblogs/?page=${currentPage}`,
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => {
        setitemsPerPage(res.data.page_size);
        setBlogs(res.data.results);
        setTotalBlogs(res.data.count);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }; // Include authToken as a dependency to refetch data when the token changes
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="w-100 p-3">
      {blogs.map(
        (
          blog // Use the fetched blogs from the state
        ) => (
          <Col key={blog.id} className="w-100 p-3">
            <article>
              <Blogs blog={blog} />
            </article>
          </Col>
        )
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default HomeScreen;
