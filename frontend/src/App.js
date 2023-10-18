import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Login from "./screens/Login";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPosts from "./screens/UserPosts";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import BlogPost from "./screens/BlogPost";
import Blog from "./screens/Blog";
import MyPosts from "./screens/MyPosts";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogpost" element={<BlogPost />} />
            <Route path="/user/:id" element={<UserPosts />} />
            <Route path="/user" element={<MyPosts />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
