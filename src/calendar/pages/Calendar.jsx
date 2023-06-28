import { useEffect } from "react";
import { useCalendarStore } from "../../hooks";
import {
  AddNewItemFab,
  CalendarComponent,
  DeleteFab,
  Navbar,
} from "../components";

export const Calendar = () => {
  const { startLoadingEvents } = useCalendarStore();

  useEffect(() => {
    startLoadingEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar></Navbar>

      <CalendarComponent />

      <AddNewItemFab />
      <DeleteFab />
    </>
  );
};
