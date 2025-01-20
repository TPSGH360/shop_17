import React from "react";

function About() {
  return (
    <div className="container my-4">
      <div className="text-center">
        <h1 className="display-4 fw-bold text-primary">About Us</h1>
        <p className="lead text-muted mb-4">
          Welcome to our store, where technology meets style!
        </p>
      </div>

      <div className="row gy-4">
        <div className="col-md-6">
          <img
            src="https://img.freepik.com/free-vector/mobile-shopping-e-commerce-isometric-composition-with-online-store-big-sale-event-tablet-screen_1284-26680.jpg"
            alt="Our Store"
            className="about-img"
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-secondary">Who We Are</h2>
          <p>
            We are passionate about providing the best products in technology
            and electronics, including phones, laptops, and accessories.
          </p>
          <h2 className="text-secondary">Our Mission</h2>
          <p>
            Our mission is to bring you high-quality products at competitive
            prices while ensuring an excellent customer experience.
          </p>
          <h2 className="text-secondary">Why Choose Us?</h2>
          <ul>
            <li>Wide selection of the latest gadgets.</li>
            <li>Exceptional customer support.</li>
            <li>Fast and reliable delivery service.</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-4">
        <h3 className="text-success">We are here to make your life easier!</h3>
        <p className="text-muted">
          Join us and explore a world of innovation and possibilities.
        </p>
      </div>
    </div>
  );
}

export default About;
