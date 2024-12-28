import React, { useState, useEffect, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import CalendarDays from "../../../Component/General/CalendarDays";
import moment from "moment";

interface TimeProps {
  onTimeSelect: (dateTime: { date: string; time: string }) => void;
}

const Time: React.FC<TimeProps> = ({ onTimeSelect }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string }>(() => {
    const savedDateTime = localStorage.getItem("selectedDateTime");
    return savedDateTime
      ? JSON.parse(savedDateTime)
      : { date: currentDate, time: "" };
  });

  const [month, setMonth] = useState<string>(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const timer = setInterval(() => {
      const newDate = new Date();
      setMonth(newDate.toLocaleString("default", { month: "long" }));
      setYear(newDate.getFullYear());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleTimeSelect = (time: string) => {
    setSelectedDateTime((prev) => {
      const newDateTime = { date: prev.date, time };
      localStorage.setItem("selectedDateTime", JSON.stringify(newDateTime));
      onTimeSelect(newDateTime);
      return newDateTime;
    });
  };

  const handleDateSelect = (date: string) => {
    const selectedMoment = moment(date);
    setMonth(selectedMoment.format("MMMM"));
    setYear(selectedMoment.year());

    setSelectedDateTime((prev) => {
      const newDateTime = { date, time: prev.time };
      localStorage.setItem("selectedDateTime", JSON.stringify(newDateTime));
      onTimeSelect(newDateTime);
      return newDateTime;
    });
  };

  const generateTimes = (startHour: number, endHour: number, minuteStep: number) => {
    const times: string[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += minuteStep) {
        const time = `${hour % 12 === 0 ? 12 : hour % 12}:${minutes < 10 ? "0" + minutes : minutes
          } ${hour < 12 ? "am" : "pm"}`;
        times.push(time);
      }
    }
    return times;
  };

  const times = useMemo(() => generateTimes(9, 20, 10), []);

  return (
    <div className="flex w-11/12 mx-auto">
      <div className="w-full pr-4">
        <div className="text-navy sticky top-0 left-0">
          <h3 className="text-4xl font-semibold mb-5">Select Time</h3>
          <div className="text-xl font-medium mb-4">
            {month} {year}
          </div>
          <div className="overflow-x-auto scrollsdown mb-4">
            <div className="flex space-x-2">
              <CalendarDays onSelectDate={handleDateSelect} />
            </div>
          </div>
          <div>
            {times.map((time) => (
              <button
                key={time}
                className={`w-full text-left p-6 rounded-xl mb-2 border ${selectedDateTime.time === time ? "border-2 border-light" : "bg-white"
                  }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Time;