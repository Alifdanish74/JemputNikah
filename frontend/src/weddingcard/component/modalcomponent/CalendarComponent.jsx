import  { useEffect } from "react";
import Calendar from "color-calendar";
import "color-calendar/dist/css/theme-glass.css";

const CalendarComponent = () => {
  useEffect(() => {
    const calendar = new Calendar({
      id: "#myCal",
      theme: "glass",
      weekdayType: "long-upper",
      monthDisplayType: "long",
      calendarSize: "small",
      headerColor: "black",
      headerBackgroundColor: "grey",
      eventsData: [
        {
          id: 1,
          name: "Walimatulurus Danish & Iqkriany",
          start: "2024-08-10T20:00:00",
          end: "2024-08-10T23:30:00",
        },
      ],
    });

    const initialDate = new Date(2024, 7, 10); // Note: Months are zero-indexed (0 = January, 7 = August)
    calendar.setDate(initialDate);
  }, []); // Empty dependency array to run once on mount

  return <div id="myCal"></div>;
};

export default CalendarComponent;
