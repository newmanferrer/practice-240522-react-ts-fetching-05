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
