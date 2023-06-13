import {
  AddNewItemFab,
  CalendarComponent,
  DeleteFab,
  Navbar,
} from "../components";

export const Calendar = () => {
  return (
    <>
      <Navbar></Navbar>

      <CalendarComponent />

      <AddNewItemFab />
      <DeleteFab />
    </>
  );
};
