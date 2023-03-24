import React from "react";
import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../buttons/login-button";
import { LogoutButton } from "../buttons/logout-button";
import { SignupButton } from "../buttons/signup-button";

export const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  
  return (
    <Box>
      <NavLink to="/">Home</NavLink>
      {isAuthenticated && (
        <>
          <NavLink to="/profile" end>
            Profile
          </NavLink>
          <NavLink to="/add" end>
            Add Excuse
          </NavLink>
        </>
      )}
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && <LogoutButton />}
    </Box>
  );
};
