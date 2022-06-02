import { useEffect } from 'react';
import { useCreateUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../redux/features/fakeapi';
import { setUserToEdit } from '../../redux/features/userToEdit';
import { useAppSelector, useAppDispatch, useForm } from '../../hooks';
import { user } from '../../models';
import { FormStyled, TitleStyled, InputsWrapper, InputStyled, ButtonsWrapper, ButtonStyled } from './StyledComponents';
import { COLORS } from '../../colors';

const initialState: user = {
  id: '',
  name: '',
  username: '',
  email: ''
};

export const UserForm = () => {
  const { userToEdit } = useAppSelector(state => state.userToEdit);
  const { form, setForm, clearForm, handleChange } = useForm(initialState);
  const [createUser, result] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { refetch } = useGetUsersQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userToEdit) setForm(userToEdit);
    else clearForm();
  }, [userToEdit, setForm, clearForm]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.username || !form.email) {
      alert('incomplete data...');
      return;
    }

    if (form.id === '') {
      createUser(form);
      refetch();
    } else {
      updateUser(form);
      refetch();
    }

    handleClearForm();
  };

  const handleClearForm = () => {
    clearForm();
    dispatch(setUserToEdit(null));
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <TitleStyled>{userToEdit ? 'Edit User' : 'Create User'}</TitleStyled>

      <InputsWrapper>
        <InputStyled type='text' name='name' value={form.name} placeholder='name' onChange={handleChange} />
        <InputStyled type='text' name='username' value={form.username} placeholder='username' onChange={handleChange} />
        <InputStyled type='email' name='email' value={form.email} placeholder='email' onChange={handleChange} />
      </InputsWrapper>

      <ButtonsWrapper>
        <ButtonStyled type='reset' colorHover={COLORS.error} bgHover={COLORS.warning} onClick={handleClearForm}>
          CLEAR
        </ButtonStyled>
        <ButtonStyled type='submit' colorHover={COLORS.white} bgHover={COLORS.success}>
          SEND
        </ButtonStyled>
      </ButtonsWrapper>
    </FormStyled>
  );
};
