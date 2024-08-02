import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: {},
    notifications: [], 
    forms:{}
  };
  
  export const globalStates = createSlice({
    name: 'global',
    initialState,
    reducers: {
      dispatchProfile: (state, action) => {
        state.profile = action.payload;
      },
      dispatchForms: (state, action) => {
        state.forms = action.payload;
      },
      dispatchCurrency: (state, action) => {
        state.forms = action.payload;
      },
      updateForms: (state, action) => {
        const { name, value } = action.payload;
        state.forms[name] = value;
      },
      dispatchNotifications: (state, action) => {
        state.notifications = action.payload;
      },
    },
  });


export const { dispatchForms,dispatchNotifications,dispatchProfile,dispatchCurrency } = globalStates.actions

export default globalStates.reducer