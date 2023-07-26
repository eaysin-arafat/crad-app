/* eslint-disable react/prop-types */
import { Fragment } from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

export default function RootLayout({ search, setSearch, width }) {
  return (
    <Fragment>
      <div style={{ marginLeft: "90px", marginTop: "30px" }}>
        <header>
          <Nav search={search} setSearch={setSearch} width={width} />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
}
