import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  initialState: {
    isDateModalOpen: false,
  },
  name: "uiSlice",
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
    onTriggerModal: (state, action) => {
      state.isDateModalOpen = action.payload;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal, onTriggerModal } =
  uiSlice.actions;
