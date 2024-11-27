// components/ModalComponentCalendar.js

import { useEffect } from "react";
import { useWeddingCard } from "../../../customhooks/WeddingCardContext";
import { FaGoogle, FaApple } from "react-icons/fa";
import Calendar from "color-calendar";
import "color-calendar/dist/css/theme-glass.css";

const ModalComponentCalendar = () => {
  const { weddingCard } = useWeddingCard();

  if (!weddingCard) return <p>Wedding card not found.</p>;

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

  const handleIcsDownload = () => {
    const event = {
      title: `${weddingCard.tajukMajlis} ${weddingCard.hashtag}`,
      description: `${weddingCard.tajukMajlis} ${weddingCard.hashtag}`,
      location: `${weddingCard.locationMajlis} ${weddingCard.fullLocationMajlis}`,
      startDate: weddingCard.tarikhMajlis.replace(/[-:]/g, "").slice(0, 15),
      endDate: weddingCard.tarikhMajlis.replace(/[-:]/g, "").slice(0, 15),
    };

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
DTSTART:${event.startDate}
DTEND:${event.endDate}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${weddingCard.hashtag}.ics`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const googleCalendarLink = () => {
    const event = {
      title: `${weddingCard.tajukMajlis} ${weddingCard.hashtag}`,
      description: `${weddingCard.tajukMajlis} ${weddingCard.hashtag}`,
      location: `${weddingCard.locationMajlis} ${weddingCard.fullLocationMajlis}`,
      startDate: weddingCard.tarikhMajlis.replace(/[-:]/g, "").slice(0, 15), // Google Calendar format
      endDate: weddingCard.tarikhMajlis.replace(/[-:]/g, "").slice(0, 15), // Use the same value if it's an all-day event
    };

    return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`;
  };

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
            start: weddingCard.tarikhMajlis,
            end: weddingCard.tarikhMajlis,
          },
        ],
      });

      calendar.setDate(weddingCard.tarikhMajlis);
    }, [weddingCard.tarikhMajlis]);

    return <div id="myCal"></div>;
  };

  return (
    <>
      <div className="flex flex-col mb-5 min-h-[66vh]">
        <h2 className="text-lg mb-2 text-center font-bold text-gray-500">
          Calendar
        </h2>

        <h2 className="text-lg pb-5 text-center font-semibold text-gray-600">
          {dayNumber} {month} {year}, {dayName}
        </h2>

        <div className="pb-4 flex flex-col items-center justify-center">
          <CalendarComponent />
        </div>

        <div className="flex flex-col text-base text-center font-semibold justify-center items-center">
          <button className="flex items-center bg-transparent text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors">
            <a
              href={googleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaGoogle className="mr-2 text-2xl" />
              Add to Google Calendar
            </a>
          </button>

          <button
            onClick={handleIcsDownload}
            className="flex items-center bg-transparent text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            <FaApple className="mr-2 text-3xl" />
            Add to Apple Calendar
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalComponentCalendar;
