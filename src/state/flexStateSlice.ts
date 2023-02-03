import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IFlexState {
  iframeRef?: HTMLIFrameElement,
  anchorElement?: HTMLButtonElement,
  show: boolean
}

const flexSlice = createSlice({
  name: 'flex',
  initialState: {
    show: false
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

      state.iframeRef?.contentWindow?.postMessage(action.payload,'*');
    },
    setIframeShown: (state: IFlexState, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    }


  }
})

export const { makeOutboundCall, setIframeRef, setIframeShown } = flexSlice.actions

export default flexSlice.reducer;