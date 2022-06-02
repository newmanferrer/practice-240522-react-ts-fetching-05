import { useEffect } from 'react';
import { useAppDispatch, useForm } from '../../hooks';
import { setSearch } from '../../redux/features/search';
import { FormStyled, InputStyled } from './StyledComponents';

const initialState = {
  search: ''
};

export const SearchForm = () => {
  const { form, handleChange } = useForm(initialState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearch(form.search));
  }, [form.search]);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled type='text' name='search' value={form.search} placeholder='search user...' onChange={handleChange} />
    </FormStyled>
  );
};
