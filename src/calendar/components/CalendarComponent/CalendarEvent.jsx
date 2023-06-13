import PropTypes from "prop-types";
import { memo } from "react";

export const CalendarEvent = memo(({ event }) => {
  const { user, title } = event;

  return (
    <>
      {title && <strong>{title}</strong>}
      <br />
      {user?.name && <small>{user.name}</small>}
    </>
  );
});

CalendarEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

CalendarEvent.displayName = "CalendarEvent";
