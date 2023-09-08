import React, { useEffect, useRef, useState } from "react";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import {
  Tabs,
  Tab,
  Toolbar,
  AppBar,
  Box,
  Typography,
  Popover,
  Button,
  IconButton
} from "@mui/material";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { UserMenu, Logout, LoadingIndicator } from "react-admin";
import { useDispatch } from "react-redux";
import { setIframeRef, setIframeShown } from "./state/flexStateSlice";
import { RootState } from "./state/store";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  let currentPath = "/";
  if (!!matchPath("/contacts/*", location.pathname)) {
    currentPath = "/contacts";
  } else if (!!matchPath("/companies/*", location.pathname)) {
    currentPath = "/companies";
  } else if (!!matchPath("/deals/*", location.pathname)) {
    currentPath = "/deals";
  }
  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Box flex={1} display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                sx={{ marginRight: "1em", height: 30 }}
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                }
                alt="Bosch Logo"
              />
              <Typography component="span" variant="h5">
                {process.env.REACT_APP_TITLE}
              </Typography>
            </Box>
            <Box>
              <Tabs
                value={currentPath}
                aria-label="Navigation Tabs"
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab label={"Dashboard"} component={Link} to="/" value="/" />
                <Tab
                  label={"Contacts"}
                  component={Link}
                  to="/contacts"
                  value="/contacts"
                />
                <Tab
                  label={"Companies"}
                  component={Link}
                  to="/companies"
                  value="/companies"
                />
                <Tab
                  label={"Deals"}
                  component={Link}
                  to="/deals"
                  value="/deals"
                />
              </Tabs>
            </Box>
            <Box display="flex">
              <UserMenu>
                <Logout />
              </UserMenu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
