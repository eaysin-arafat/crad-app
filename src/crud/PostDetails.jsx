/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function PostDetails({ posts, handleDelete }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => `${post.id}` === id);

  return (
    <Fragment>
      <div>
        <h2>{post.title}</h2>
        <p>{post.date}</p>
        <p>{post.body}</p>
        <div className="button-group">
          <button
            onClick={() => {
              handleDelete(post.id);
              navigate("/posts");
            }}
          >
            Delete
          </button>
          <Link to={`/edit/${post.id}`}>
            <button>Update Post</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
