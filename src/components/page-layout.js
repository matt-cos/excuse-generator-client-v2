import React from "react";
import { Container } from "@chakra-ui/react";
import { NavBar } from "./navigation/nav-bar";
import { PageFooter } from "./page-footer";

export const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      <Container>{children}</Container>
      <PageFooter />
    </div>
  );
};
