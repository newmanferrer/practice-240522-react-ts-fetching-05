import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { user } from '../../../models';

export const fakeApi = createApi({
  reducerPath: 'fakeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  // encourage recovery in additional situations where the default behavior would serve cached data instead.
  // refetchOnMountOrArgChange: 30,
  // Update when we change browser window. setupListeners is required in store.
  // refetchOnFocus: true,
  // retrieve all subscribed queries after retrieving a network connection. etupListeners is required in store.
  // refetchOnReconnect: true,
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
