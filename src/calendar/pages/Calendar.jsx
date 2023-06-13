import {
  AddNewItemFab,
  CalendarComponent,
  Navbar,
} from "../components";

export const Calendar = () => {
  return (
    <>
      <Navbar></Navbar>

      <CalendarComponent />

      <AddNewItemFab />
    </>
  );
};
