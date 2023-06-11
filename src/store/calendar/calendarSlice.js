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
  },
});

export const { onSetActiveEvent } = calendarSlice.actions;
