import { useCalendarStore } from "../../../hooks";
import "./DeleteFab.css";

export const DeleteFab = () => {
  const { deleteActiveEvent, hasEventSelected } = useCalendarStore();

  const handleDeleteEvent = () => {
    deleteActiveEvent();
  };

  return (
    <button
      disabled={!hasEventSelected}
      onClick={handleDeleteEvent}
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
