import { useAppSelector } from '../../hooks';
import { UserItem } from '../';
import { UlStyled } from './StyledComponents';
import { useGetUsersQuery } from '../../redux/features/fakeapi';

export const UsersList = () => {
  const { data: users } = useGetUsersQuery();
  const { search } = useAppSelector(state => state.search);

  return (
    <UlStyled>
      {users &&
        users
          .filter(
            user =>
              user.id.toLowerCase().includes(search.toLowerCase()) ||
              user.name.toLowerCase().includes(search.toLowerCase()) ||
              user.username.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
          )
          .map(user => <UserItem key={user.id} user={user} />)}
    </UlStyled>
  );
};
