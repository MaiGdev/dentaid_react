import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import dateFnsLocalizer from "react-big-calendar/lib/localizers/date-fns";
import es from "date-fns/locale/es";
import { useState } from "react";

const events = [
  {
    title: "Meeting",
    /* año mes dia */
    start: new Date(2023, 3, 6, 4, 0), // 1:00 PM
    end: new Date(2023, 3, 6, 4, 0), // 2:00 PM
  },
  {
    title: "Lunch",
    /*         new Date(año, mes, día, horas, minutos, segundos)*/
    start: new Date(2023, 3, 6, 13, 0), // 1:00 PM
    end: new Date(2023, 3, 6, 14, 0), // 2:00 PM
  },
];

const myCalendar = (props) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const formats = {
    dateFormat: "dd",
    dayFormat: (date, culture, localizer) =>
      localizer.format(date, "EEEE", culture),
  };

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { es },
    ...formats,
  });
  moment.locale("es");

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        defaultView="week"
      />
    </div>
  );
};

export default myCalendar;
