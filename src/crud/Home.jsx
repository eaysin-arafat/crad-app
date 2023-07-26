/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home({ posts, isLoading, fetchError }) {
  return (
    <Fragment>
      {isLoading && <h3>Loading posts...</h3>}
      {!isLoading && fetchError && (
        <h3 style={{ color: "red" }}>{fetchError}</h3>
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          posts.map((post) => (
            <Link className="home-posts" to={`/posts/${post.id}`} key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
              <p>
                {post.body >= 40 ? post.body : `${post.body.slice(0, 40)}...`}
              </p>
            </Link>
          ))
        ) : (
          <p>No Posts to Display</p>
        ))}
    </Fragment>
  );
}
