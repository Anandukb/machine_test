import React from "react";

const Header = ({ logoutHandler, setSearchKey }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand text-light" href="#">
          Country List
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
              class="btn btn-outline-light"
              type="button"
              onClick={(e) => logoutHandler(e)}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
