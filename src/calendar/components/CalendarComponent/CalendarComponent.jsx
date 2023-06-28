/* eslint-disable no-unused-vars */
import { Calendar as CalendarLib } from "react-big-calendar";

import { useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  useAuthStore,
  useCalendarStore,
  useUIStore,
} from "../../../hooks";
import { CalendarModal } from "../CalendarModal/CalendarModal";
import { localizer, messages } from "./CalendarConfig";
import { CalendarEvent } from "./CalendarEvent";

export const CalendarComponent = () => {
  const { triggerModal } = useUIStore();
  const { events, setActiveEvent } = useCalendarStore();
  const { user } = useAuthStore();
  const [lastViewSelected, setLastViewSelected] = useState(
    localStorage.getItem("last-view") || "week"
  );

  const changeEventStyle = (event, start, end, isSelected) => {
    const isMyEvent = user._id === event.user._id;
    const style = {
      backgroundColor: isMyEvent ? "#347cf7" : "#FFC300",
      borderRadius: "0px",
      opacity: 0.9,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClickEvent = (event) => {
    triggerModal(true);
  };

  const onSelectEvent = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("last-view", event);
  };

  return (
    <>
      <CalendarLib
        localizer={localizer}
        events={events}
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
