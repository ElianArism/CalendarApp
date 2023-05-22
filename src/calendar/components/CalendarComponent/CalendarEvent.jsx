import PropTypes from "prop-types";
import { memo } from "react";

export const CalendarEvent = memo(({ event }) => {
  const { user, title } = event;

  return (
    <>
      <strong>{title}</strong>
      <br />
      <small>{user.name}</small>
    </>
  );
});

CalendarEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

CalendarEvent.displayName = "CalendarEvent";
