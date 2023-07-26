/* eslint-disable react/prop-types */
import { Fragment, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
export default function EditPost({
  posts,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody,
  handleEdit,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => `${post.id}` === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);

  return (
    <div>
      {editTitle && (
        <Fragment>
          <h2>Update Post</h2>
          <form
            action=""
            className="add-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="title">
              Title
              <input
                className="title"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </label>
            <label htmlFor="body">
              Body
              <textarea
                className="body"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </label>
            <button
              type="submit"
              onClick={() => {
                handleEdit(post.id);
                navigate("/posts");
              }}
            >
              Submit
            </button>
          </form>
        </Fragment>
      )}

      {!editTitle && (
        <Fragment>
          <h2>Post Not Found</h2>
          <p>Well, thats disappointing</p>
          <p>
            <Link to="/posts">Visit Homepage</Link>
          </p>
        </Fragment>
      )}
    </div>
  );
}
