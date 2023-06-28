import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    activeEvent: null,
  },
  reducers: {
    clearEvents: (state) => {
      state.events = [];
    },
    onSetEvents: (state, { payload }) => {
      state.events = payload;
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((e) => {
        if (e._id === payload._id) {
          return payload;
        }
        return e;
      });
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(
        (e) => e._id !== state.activeEvent._id
      );
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onSetEvents,
  onDeleteEvent,
  clearEvents,
  startLoadingEvents,
} = calendarSlice.actions;
