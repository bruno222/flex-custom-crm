import * as React from "react";
import { Phone } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";

import { useDispatch } from "react-redux";
import { makeOutboundCall, setIframeShown } from "../state/flexStateSlice";

export interface OutboundCallComponentProps {
  phoneNumber: string;
}

export const OutboundCall = (props: OutboundCallComponentProps) => {
  const dispatch = useDispatch();

  const handleCallButtonClick = () => {
    dispatch(setIframeShown(true));
    dispatch(makeOutboundCall({destination: props.phoneNumber}));
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} textAlign="center">
      <Fab
        size="small"
        color="success"
        aria-label="add"
        onClick={handleCallButtonClick}
      >
        <Phone />
      </Fab>
    </Box>
  );
};
