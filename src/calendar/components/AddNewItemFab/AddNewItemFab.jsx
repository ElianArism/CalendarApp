import { useCalendarStore, useUIStore } from "../../../hooks";
import "./AddNewItemFab.css";

export const AddNewItemFab = () => {
  const { triggerModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  const addNewItem = () => {
    setActiveEvent(null);
    triggerModal(true);
  };

  return (
    <button onClick={addNewItem} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};
