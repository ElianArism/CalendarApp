import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import ReactModal from "react-modal";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useCalendarStore, useUIStore } from "../../../hooks/";
import "./CalendarModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, triggerModal } = useUIStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const fieldTitleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length < 1 ? "is-invalid" : "is-valid";
  }, [formValues.title, formSubmitted]);

  const titleHelperMsgOpacity = useMemo(() => {
    return fieldTitleClass.length < 1 ||
      fieldTitleClass === "is-valid"
      ? 0
      : 1;
  }, [fieldTitleClass]);

  const onCloseModal = () => {
    triggerModal(false);
  };

  const onInputChange = ({ target }) => {
    setFormValues((values) => ({
      ...values,
      [target.name]: target.value,
    }));
  };

  const onDatePickerChange = (value, controlToChange) => {
    setFormValues((values) => ({
      ...values,
      [controlToChange]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    const dateDiff = differenceInSeconds(
      formValues.end,
      formValues.start
    );

    if (isNaN(dateDiff) || dateDiff <= 0) {
      Swal.fire(
        "Error",
        "The end date is less than the start date or one of them is invalid ",
        "error"
      );
      return;
    }

    if (formValues.title.length < 1) {
      return;
    }

    startSavingEvent(formValues);
    triggerModal(false);
    setFormSubmitted(false);
  };

  useEffect(() => {
    if (!activeEvent) return;
    setFormValues({ ...activeEvent });
  }, [activeEvent]);

  return (
    <ReactModal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-bg"
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <hr />
      <form onSubmit={onSubmit} className="container">
        <div className="form-group mb-2">
          <label>Start date</label>

          <ReactDatePicker
            className="form-control"
            onChange={(date) => onDatePickerChange(date, "start")}
            selected={formValues.start}
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <div className="form-group mb-2">
          <label>End date</label>
          <ReactDatePicker
            className="form-control"
            onChange={(date) => onDatePickerChange(date, "end")}
            selected={formValues.end}
            minDate={formValues.start}
            dateFormat="Pp"
            showTimeSelect
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and description</label>
          <input
            type="text"
            className={"form-control " + fieldTitleClass}
            placeholder="Event title"
            name="title"
            value={formValues.title}
            onChange={onInputChange}
            autoComplete="off"
          />
          <small
            id="emailHelp"
            className="form-text  text-danger"
            style={{
              opacity: titleHelperMsgOpacity,
            }}
          >
            This field is required
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            value={formValues.notes}
            onChange={onInputChange}
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional information
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Save </span>
        </button>
      </form>
    </ReactModal>
  );
};
