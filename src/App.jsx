import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./crud/Home";
import PostDetails from "./crud/PostDetails";
import AddPost from "./crud/AddPost";
import About from "./crud/About";
import EditPost from "./crud/EditPost";
import RootLayout from "./crud/RootLayout";
import Error from "./crud/Error";
import api from "./crud/api/posts";
import useWindowSize from "./hooks/useWindowSize";
import useAxiusFetch from "./hooks/useAxiusFetch";
import { format } from "date-fns";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [search, setSearch] = useState("");
  const { width } = useWindowSize();

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //       setIsLoading(false);
  //     } catch (err) {
  //       if (err.response) {
  //         console.log(err.response.status);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  const { data, fetchError, isLoading } = useAxiusFetch(
    "http://localhost:3800/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  // filer post
  let filterPost = [];
  if (posts?.length > 0) {
    filterPost = posts.filter((post) => {
      return (
        post.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
        post.title?.toLowerCase()?.includes(search?.toLowerCase())
      );
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, date: dateTime, title: title, body: body };

    try {
      const response = await api.post("/posts", newPost);
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setTitle("");
      setBody("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const updatePost = { id, date: dateTime, title: editTitle, body: editBody };

    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      setPosts(response.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout search={search} setSearch={setSearch} width={width} />
          }
        >
          <Route
            path="/posts"
            element={
              <Home
                posts={filterPost}
                isLoading={isLoading}
                fetchError={fetchError}
              />
            }
          />
          <Route
            path="/posts/new"
            element={
              <AddPost
                title={title}
                body={body}
                setTitle={setTitle}
                setBody={setBody}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditPost
                posts={posts}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
                handleEdit={handleEdit}
              />
            }
          />
          <Route
            path="/posts/:id"
            element={<PostDetails posts={posts} handleDelete={handleDelete} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
