import { useDispatch, useSelector } from "react-redux";
import { onTriggerModal } from "../store";

export const useUIStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const triggerModal = (openModal) => {
    dispatch(onTriggerModal(openModal));
  };

  return { isDateModalOpen, triggerModal };
};
