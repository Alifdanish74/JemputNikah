// components/ModalComponentCalendar.js

import { useEffect } from "react";
import { useWeddingCard } from "../../../customhooks/WeddingCardContext";
// import CalendarComponent from "./CalendarComponent";
import { FaGoogle, FaApple } from "react-icons/fa";
import Calendar from "color-calendar";
import "color-calendar/dist/css/theme-glass.css";


const ModalComponentCalendar = () => {
  const { weddingCard } = useWeddingCard();

  const dateString = weddingCard.tarikhMajlis.split("T")[0]; // Extract the date part only
  const date = new Date(dateString); // Now `date` represents only the date

  const dayName = new Intl.DateTimeFormat("ms-MY", { weekday: "long" }).format(
    date
  );
  const dayNumber = new Intl.DateTimeFormat("ms-MY", { day: "numeric" }).format(
    date
  );
  const month = new Intl.DateTimeFormat("ms-MY", { month: "long" }).format(
    date
  );
  const year = new Intl.DateTimeFormat("ms-MY", { year: "numeric" }).format(
    date
  );

  // if (loading) return <p>Loading wedding card details...</p>;
  if (!weddingCard) return <p>Wedding card not found.</p>;

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
            // start: "2024-08-10T20:00:00",
            start: weddingCard.tarikhMajlis,
            end: weddingCard.tarikhMajlis,
          },
        ],
      });
  
    //   const initialDate = new Date(2024, 7, 10); // Note: Months are zero-indexed (0 = January, 7 = August)
      calendar.setDate(weddingCard.tarikhMajlis);
    }, []); // Empty dependency array to run once on mount
  
    return <div id="myCal"></div>;
  };

  return (
    <>
      <div className="flex flex-col mb-5 min-h-[66vh]">
        <h2 className="text-lg mb-2 text-center font-bold text-gray-500">
          Calendar
        </h2>

        <h2 className="text-lg pb-5 text-center font-semibold text-gray-600">
          {dayNumber} {month} {year} , {dayName}
        </h2>

        <div className="pb-4 flex flex-col items-center justify-center">
          <CalendarComponent />
        </div>

        <div className=" flex flex-col text-base text-center font-semibold justify-center items-center">
          <button className="flex items-center bg-transparent text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors">
            <a
              href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MTIxNGZodG42Z2xsYmcwNTdtcXQwcWY2YmwgYWxpZmRhbmlzaDc0QG0&tmsrc=alifdanish74%40gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaGoogle className="mr-2 text-2xl" />
              Add to Google Calendar
            </a>
          </button>

          <button className="flex items-center bg-transparent text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors">
            <a
              href="/DanishIqkrianyWeddingInvitation.ics"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaApple className="mr-2 text-3xl" />
              Add to Apple Calendar
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalComponentCalendar;
