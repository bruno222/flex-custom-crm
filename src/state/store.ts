import { configureStore } from '@reduxjs/toolkit'
import FlexReducer from './flexStateSlice';

export const store = configureStore({
  reducer: {flex: FlexReducer},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch