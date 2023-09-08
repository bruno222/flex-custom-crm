import React, { useEffect, useRef, useState } from "react";
import { Button, Paper, Box, Fade, IconButton, Slide } from "@mui/material";
import { SupportAgent, Clear, OpenInFull } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { setIframeRef, setIframeShown } from "../state/flexStateSlice";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

const TwilioFlex = () => {
  const dispatch = useDispatch();
  const iframeShown = useSelector<RootState, boolean>(
    (state) => state.flex.show
  );
  const [iframeExpanded, setIframeWidth] = useState(false)

  const flexIframe = useRef<HTMLIFrameElement>(null);
  const agentButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(setIframeShown(false));
  }, []);

  useEffect(() => {
    if (flexIframe.current) dispatch(setIframeRef(flexIframe.current));
  }, [flexIframe.current, agentButton.current]);

  const toggleIframe = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIframeShown(!iframeShown));
  };

  const toggleIframeExpanded = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIframeWidth(!iframeExpanded)
  };

  const buttonStyle = {
    margin: 0,
    top: "50%",
    right: 0,
    bottom: "auto",
    left: "auto",
    position: "fixed",
    "z-index": 9999,
  };

  const iframeStyle = {
    margin: 0,
    top: "auto",
    right: 10,
    bottom: 10,
    left: "auto",
    position: "fixed",
    "z-index": 9999,
  };

  return (
    <>
      <Fade in={!iframeShown}>
        <Button
          sx={buttonStyle}
          variant="contained"
          aria-label="agent"
          onClick={toggleIframe}
        >
          <SupportAgent />
        </Button>
      </Fade>

      <Slide direction="left" in={iframeShown}>
        <Paper sx={iframeStyle}>
          <Box
            bgcolor="primary.main"
            borderRadius={"5px 5px 0px 0px"}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <IconButton aria-label="expand" size="small" onClick={toggleIframeExpanded}>
              <OpenInFull color="secondary" fontSize="small" />
            </IconButton>
            <IconButton aria-label="close" size="small" onClick={toggleIframe}>
              <Clear color="secondary" fontSize="small" />
            </IconButton>
          </Box>
          <Box>
            <iframe
              ref={flexIframe}
              allow="camera;microphone"
              src={process.env.REACT_APP_FLEX_URL}
              width={iframeExpanded ? 1100 : 550}
              height="900px"
              style={{ 
                border: "0", 
                transition: "width 0.1s ease-in"
              }}
            ></iframe>
          </Box>
        </Paper>
      </Slide>
    </>
  );
};

export default TwilioFlex;
