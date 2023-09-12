import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IFlexState {
  iframeRef?: HTMLIFrameElement,
  anchorElement?: HTMLButtonElement,
  show: boolean,
  notificationCount: number
}

const flexSlice = createSlice({
  name: 'flex',
  initialState: {
    show: false,
    notificationCount: 0
  },
  reducers: {
    setIframeRef: (state: IFlexState, action: PayloadAction<HTMLIFrameElement>) => {
      state.iframeRef = action.payload;
    },
    setAnchorElement: (state: IFlexState, action: PayloadAction<HTMLButtonElement>) => {
      state.anchorElement = action.payload;
    },
    makeOutboundCall: (state: IFlexState, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.show = true

      state.iframeRef?.contentWindow?.postMessage({destination: action.payload.destination, taskAttributes: {contactId: 500}, action: "startOutboundCall"},'*');

      return state;
    },
    setIframeShown: (state: IFlexState, action: PayloadAction<boolean>) => {
      if(action.payload) state.notificationCount = 0;
      state.show = action.payload;
      return state;
    },
    incrementNotificationCount: (state: IFlexState) => {
      if(!state.show) state.notificationCount ++;
    }
  }
})

export const { makeOutboundCall, setIframeRef, setIframeShown, incrementNotificationCount } = flexSlice.actions

export default flexSlice.reducer;