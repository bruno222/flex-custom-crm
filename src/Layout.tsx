import React, { HtmlHTMLAttributes, useState } from "react";
import { CssBaseline, Container } from "@mui/material";
import { CoreLayoutProps } from "react-admin";
import { ErrorBoundary } from "react-error-boundary";

import { Error } from "react-admin";
import Header from "./Header";
import { Resizable } from "react-resizable";

import { Grid, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const [state, setState] = useState({
    width: 200,
    height: 200,
  });

  // On top layout
  const onResize = (event: any, args: any) => {
    setState({ width: args.size.width, height: args.size.height });
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{ maxWidth: { xl: 1280 } }}>
        <main id="main-content">
          {/* @ts-ignore */}
          <ErrorBoundary FallbackComponent={Error}>{children}</ErrorBoundary>
        </main>
        <
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <iframe
            allow="camera;microphone"
            src={process.env.REACT_APP_FLEX_URL}
            width="100%"
            height="100%"
          ></iframe>
        </SpeedDial>
      </Container>
    </>
  );
};

export interface LayoutProps
  extends CoreLayoutProps,
    Omit<HtmlHTMLAttributes<HTMLDivElement>, "title"> {}

export default Layout;
