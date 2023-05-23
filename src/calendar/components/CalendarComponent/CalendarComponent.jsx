/* eslint-disable no-unused-vars */
import { Calendar as CalendarLib } from "react-big-calendar";

import { addHours } from "date-fns";

import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarModal } from "../CalendarModal/CalendarModal";
import { localizer, messages } from "./CalendarConfig";
import { CalendarEvent } from "./CalendarEvent";

const myEventsList = [
  {
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
];

export const CalendarComponent = () => {
  const [lastViewSelected, setLastViewSelected] = useState(
    localStorage.getItem("last-view") || "week"
  );

  const changeEventStyle = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347cf7",
      borderRadius: "0px",
      opacity: 0.9,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClickEvent = (event) => {
    console.log(event);
  };
  const onSelectEvent = (event) => {
    console.log(" on select ", event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("last-view", event);
  };

  return (
    <>
      <CalendarLib
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        culture="en"
        messages={messages}
        eventPropGetter={changeEventStyle}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        defaultView={lastViewSelected}
      />
      <CalendarModal />
    </>
  );
};
