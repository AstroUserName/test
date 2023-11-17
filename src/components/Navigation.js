import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navigation = ({ navigationPath, name }) => {
  const { pathname } = useLocation();
  return (
    <div className={`navigation ${pathname.includes(name) ? "active" : ""}`}>
      <Link className="navigation-item" to={navigationPath}>{name}</Link>
    </div>
  );
};

export default Navigation;
