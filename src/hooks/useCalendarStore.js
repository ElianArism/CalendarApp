import { useDispatch, useSelector } from "react-redux";
import API from "../api/calendarApi";
import { parseEventsDates } from "../helpers/parseEventsDates";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onSetEvents,
  onUpdateEvent,
} from "../store";
import { usePopup } from "./usePopup";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { buildCustomPopup } = usePopup();

  const { events, activeEvent } = useSelector(
    (store) => store.calendar
  );
  const { user } = useSelector((store) => store.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (event) => {
    try {
      if (event?._id) {
        await API.put(`/events/${event._id}`, event);
        dispatch(onUpdateEvent(event));
        return;
      }
      const { data: response } = await API.post("/events", event);
      console.log(response.data);
      dispatch(
        onAddNewEvent({
          ...event,
          _id: response.data._id,
          user: {
            _id: user._id,
            username: user.username,
          },
        })
      );
    } catch (error) {
      buildCustomPopup({
        icon: "error",
        title: "Error",
        html:
          error?.response?.data?.error?.message ||
          "Internal Server Error",
      });
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data: result } = await API.get("/events");
      const events = parseEventsDates(result.data);
      dispatch(onSetEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteActiveEvent = async () => {
    if (!activeEvent) return;

    try {
      await API.delete(`/events/${activeEvent._id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      buildCustomPopup({
        icon: "error",
        title: "Error",
        html:
          error?.response?.data?.error?.message ||
          "Internal Server Error",
      });
    }
  };

  const clearEvents = () => {
    dispatch(clearEvents());
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    clearEvents,
    deleteActiveEvent,
    startLoadingEvents,
  };
};
