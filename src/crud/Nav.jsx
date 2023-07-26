/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ search, setSearch, width }) {
  return (
    <Fragment>
      <div className="navLink">
        <input
          id="search"
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <NavLink to="/posts">Home</NavLink>
        <NavLink to="/posts/new">Add Post</NavLink>
        <NavLink to="/about">About</NavLink>
        <div style={{ fontWeight: "bold", color: "gray" }}>
          {width < 768
            ? "Useing Mobile"
            : width < 992
            ? "Using Tablet"
            : "Using Laptop"}
        </div>
      </div>
    </Fragment>
  );
}
