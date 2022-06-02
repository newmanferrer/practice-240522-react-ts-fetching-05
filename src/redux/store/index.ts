import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from '../features/search';
import { userToEditReducer } from '../features/userToEdit';
import { fakeApi } from '../features/fakeapi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    userToEdit: userToEditReducer,
    [fakeApi.reducerPath]: fakeApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fakeApi.middleware)
});

// enable listener behavior for the store
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
