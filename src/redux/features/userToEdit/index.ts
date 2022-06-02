import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { user } from '../../../models';

interface initialState {
  userToEdit: user | null;
}

const initialState: initialState = {
  userToEdit: null
};

const userToEditSlice = createSlice({
  name: 'userToEdit',
  initialState,
  reducers: {
    setUserToEdit: (state, action: PayloadAction<null | user>) => {
      state.userToEdit = action.payload;
    }
  },
  extraReducers: builder => {}
});

export const userToEditReducer = userToEditSlice.reducer;
export const { setUserToEdit } = userToEditSlice.actions;
