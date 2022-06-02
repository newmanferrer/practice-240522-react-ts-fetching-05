# PRACTICE: REACT WHIT TYPESCRIPT FETCHING OF DATA 05 - REDUX TOOLKIT QUERY

## Project description

Practice react with typescript using redux toolkit query (RTKQ) for requests to the JSON Placeholder and JSON Server.
It is a simple project where we will implement a CRUD, the most important thing is to practice the tools and options available when using RTKQ for asynchronous requests.

## Used technology

- Html 5
- CSS
- JavaScript
- TypeScript
- React
- Redux Toolkit
- Redux Toolkit Query
- React Redux
- Styled Components
- ESLint
- Prettier
- Vite

## Resources used

JSON Server: https://github.com/typicode/json-server

API JSON Placeholder: https://jsonplaceholder.typicode.com/

## Developers: Requirements

- Nodejs
- Web Browser
- Code editor

## Developers: Installtion

1. Clone the repository: https://github.com/newmanferrer/practice-240522-react-ts-fetching-05.git
2. Another option is to download the repository using ZIP format.
3. Install the dependencies using the command "yarn", from the terminal console.
4. From the terminal console, execute the “yarn dev” command, to run the development server.
5. From the terminal console, execute the “yarn run fake-api” command, to run the json server.

## Important Notes, Suggestions and Recommendations

1. RTK takes inspiration from and uses the Immer library to allow you to write clearer and simpler immutable state update logic automatically, while keeping state immutability clear.

Example without Immer:

```js
builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<user[]>) => {
  return {
    ...state,
    isLoading: false,
    users: action.payload,
    errorMessage: ''
  };
});
```

Example with Immer:

```js
builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<user[]>) => {
  state.isLoading = false;
  state.users = action.payload;
  state.errorMessage = '';
});
```

# REDUX TOOLKIT QUERY (RTKQ)

RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

RTK Query is an optional addon included in the Redux Toolkit package, and its functionality is built on top of the other APIs in Redux Toolkit.

Link: https://redux-toolkit.js.org/rtk-query/overview

Web applications normally need to fetch data from a server in order to display it. They also usually need to make updates to that data, send those updates to the server, and keep the cached data on the client in sync with the data on the server. This is made more complicated by the need to implement other behaviors used in today's applications:

- Tracking loading state in order to show UI spinners
- Avoiding duplicate requests for the same data
- Optimistic updates to make the UI feel faster
- Managing cache lifetimes as the user interacts with the UI

RTK Query takes inspiration from other tools that have pioneered solutions for data fetching, like Apollo Client, React Query, Urql, and SWR, but adds a unique approach to its API design:

- The data fetching and caching logic is built on top of Redux Toolkit's createSlice and createAsyncThunk APIs
- Because Redux Toolkit is UI-agnostic, RTK Query's functionality can be used with any UI layer
- API endpoints are defined ahead of time, including how to generate query parameters from arguments and transform responses for caching
- RTK Query can also generate React hooks that encapsulate the entire data fetching process, provide data and isLoading fields to components, and manage the lifetime of cached data as components mount and unmount
- RTK Query provides "cache entry lifecycle" options that enable use cases like streaming cache updates via websocket messages after fetching the initial data
- We have early working examples of code generation of API slices from OpenAPI and GraphQL schemas
- Finally, RTK Query is completely written in TypeScript, and is designed to provide an excellent TS usage experience

# Examples

## Basic Usage

### Configure the Store

```js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { fakeApi } from '../features/fakeapi';

export const store = configureStore({
  reducer: {
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
```

### Hook

```js
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
```

### Features or Services - Create an API Slice

```js
// React-specific entry point that automatically generates hooks corresponding to the defined endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { user } from '../../../models';

export const fakeApi = createApi({
  reducerPath: 'fakeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  // encourage recovery in additional situations where the default behavior would serve cached data instead.
  refetchOnMountOrArgChange: 30,
  // Update when we change browser window. setupListeners is required in store.
  refetchOnFocus: true,
  // retrieve all subscribed queries after retrieving a network connection. setupListeners is required in store.
  refetchOnReconnect: true,
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query<user[], void>({
      query: () => 'users',
      providesTags: ['Users']
      // We can also use it in this way through a function or callback.
      // providesTags: result => (result ? result.map(({ id }) => ({ type: 'Users', id })) : ['Users'])
    }),
    getUser: builder.query<user, string>({
      query: id => `users/${id}`,
      providesTags: ['Users']
    }),
    createUser: builder.mutation<user, user>({
      query: user => ({
        url: 'users',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['Users']
    }),
    updateUser: builder.mutation<user, user>({
      query: user => ({
        url: `users/${user.id}`,
        method: 'PATCH',
        body: user
      }),
      invalidatesTags: ['Users']
      // We can also use it in this way through a function or callback.
      // invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg.id }]
    }),
    deleteUser: builder.mutation<user, string>({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = fakeApi;
```

### In App

```js
import { useGetUsersQuery } from './redux/features/fakeapi';
import { GlobalStyles, Title, Loader, Message, UserForm, SearchForm, UsersList } from './components';

interface myError {
  status: string | number;
  error: string;
}

export const App = () => {
  let { data: users, isLoading, isFetching, isSuccess, isError, error } = useGetUsersQuery();
  let errorMessage = '';
  isLoading = isFetching;

  if (error && error !== undefined) {
    const myError: myError = Object.create(error);
    if (myError.status === 'FETCH_ERROR') errorMessage = 'Failed to fetch: Server not response';
    if (myError.status === 404) errorMessage = 'Error 404: Page not found';
  }

  return (
    <>
      <GlobalStyles />
      <Title text='React with TS - Fetching 05 - RTK QUERY' size='2rem' />
      <UserForm />
      <SearchForm />
      {isLoading && <Loader />}
      {!isLoading && isError && <Message type='error' text={errorMessage ? errorMessage : 'Error: 001'} />}
      {!isLoading && !isError && isSuccess ? (
        users && users.length ? (
          <UsersList />
        ) : (
          <Message type='error' text='No users yet...' />
        )
      ) : null}
    </>
  );
};
```

---

## Author: Newman Ferrer

newmanferrer@gmail.com

:sun_with_face: Maracaibo - Venezuela :venezuela:

Practice date: 24/05/2022
