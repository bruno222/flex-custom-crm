import React, { HtmlHTMLAttributes } from "react";
import {
  CssBaseline,
  Container,
} from "@mui/material";
import { CoreLayoutProps } from "react-admin";
import { ErrorBoundary } from "react-error-boundary";

import { Error } from "react-admin";
import Header from "./Header";
import TwilioFlex from "./misc/TwilioFlex"
import FlexListener from './misc/FlexListener'

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <FlexListener />
      <CssBaseline />
      <Header />
      <Container sx={{ maxWidth: { xl: 1280 } }}>
        <main id="main-content">
          {/* @ts-ignore */}
          <ErrorBoundary FallbackComponent={Error}>{children}</ErrorBoundary>
        </main>
      </Container>
      <TwilioFlex />
    </>
  );
};

export interface LayoutProps
  extends CoreLayoutProps,
    Omit<HtmlHTMLAttributes<HTMLDivElement>, "title"> {}

export default Layout;
