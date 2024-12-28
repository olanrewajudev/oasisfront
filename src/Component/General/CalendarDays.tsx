import React, { useState } from "react";
import moment from "moment";

interface CalendarDaysProps {
  onSelectDate: (date: string) => void;
}

const CalendarDays: React.FC<CalendarDaysProps> = ({ onSelectDate }) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const nextMonth = currentMonth + 1 === 12 ? 0 : currentMonth + 1;
  const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const currentMonthDays = getDaysInMonth(currentYear, currentMonth);
  const daysToShowNextMonth = 7; // Number of days from the next month

  const [active, setActive] = useState<string>(
    `${currentYear}-${currentMonth + 1}-${date.getDate()}`
  );

  const handleDateChange = (value: string): void => {
    setActive(value);
    onSelectDate(value);
  };

  return (
    <>
      {[...Array(currentMonthDays - date.getDate() + 1).keys()].map((index) => {
        const day = date.getDate() + index;
        const timeFix = `${currentYear}-${currentMonth + 1}-${day}`;
        const momentFix = moment(timeFix).format("ddd");
        const dataToSet = moment(timeFix).format("YYYY-MM-D");
        const splitActive = active.split("-");
        const getActive = splitActive[splitActive.length - 1];

        return (
          <div key={`current-${index}`}>
            <button
              className={`size-14 rounded-full ${
                getActive === `${day}` ? "bg-light text-white" : "bg-white"
              }`}
              onClick={() => handleDateChange(dataToSet)}
            >
              {day}
            </button>
            <div className="text-center font-bold mt-2 capitalize">
              {momentFix}
            </div>
          </div>
        );
      })}
      {[...Array(daysToShowNextMonth).keys()].map((index) => {
        const day = index + 1;
        const timeFix = `${nextYear}-${nextMonth + 1}-${day}`;
        const momentFix = moment(timeFix).format("ddd");
        const dataToSet = moment(timeFix).format("YYYY-MM-D");
        const splitActive = active.split("-");
        const getActive = splitActive[splitActive.length - 1];

        return (
          <div key={`next-${index}`}>
            <button
              className={`size-14 rounded-full ${
                getActive === `${day}` ? "bg-light text-white" : "bg-white"
              }`}
              onClick={() => handleDateChange(dataToSet)}
            >
              {day}
            </button>
            <div className="text-center font-bold mt-2 capitalize">
              {momentFix}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CalendarDays;