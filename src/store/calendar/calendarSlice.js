import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [
      {
        _id: new Date().getTime(),
        title: "Check GYM Hours",
        notes: "In the morning",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "#f3f3f3",
        user: {
          _id: "125",
          name: "Elian",
        },
      },
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events.map((e) => {
        if (e._id === payload._id) {
          return payload;
        }
        return e;
      });
    },
    onDeleteEvent: (state, action) => {
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
  onDeleteEvent,
} = calendarSlice.actions;
