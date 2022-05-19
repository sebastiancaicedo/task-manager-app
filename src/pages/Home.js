import React from "react";
import { Link } from "react-router-dom";
import List from "../containers/List";

export default function Home() {
  return (
    <>
      <Link to="/create" className="btn btn-primary my-2">
        Task
      </Link>
      <List />
    </>
  );
}
