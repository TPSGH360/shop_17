import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation, Routes, Route } from "react-router-dom";

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
