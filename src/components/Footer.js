import React from "react";

function Footer() {
  return (
    <footer class="container-fluid text-center">
      <p>My Store copyright</p>
      <form class="form-inline">
        Sign up for our Catalogue:
        <input
          type="email"
          class="form-control"
          size="50"
          placeholder="Email Address"
        />
        <button type="button" class="btn btn-danger">
          Sign Up
        </button>
      </form>
    </footer>
  );
}

export default Footer;
