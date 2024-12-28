import { useCallback, useEffect, useState } from "react";
import BookingServices from "./BookingServices";
import Header from "../../../Component/User/Header";
import Professional from "./Professional";
import Time from "./Time";
import Cart from "./Cart";

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(() => {
    return localStorage.getItem("selectedProfessional") || null;
  });

  const [dateTime, setDateTime] = useState<{ date: string; time: string }>({ date: "", time: "" });

  const [isServiceSelected, setIsServiceSelected] = useState(() => {
    const savedCart = localStorage.getItem("LocalData");
    return savedCart ? JSON.parse(savedCart).length > 0 : false;
  });

  const maxSteps = 4;

  const handleNextStep = useCallback(() => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      if (nextStep <= maxSteps) {
        localStorage.setItem("currentStep", nextStep.toString());
        return nextStep;
      }
      return prevStep;
    });
  }, []);

  const handleStepChange = useCallback(
    (step: number) => {
      if (
        step < currentStep ||
        (step === 2 && isServiceSelected) ||
        (step === 3 && selectedProfessional) ||
        (step === 4 && selectedProfessional && dateTime.date && dateTime.time)
      ) {
        setCurrentStep(step);
        localStorage.setItem("currentStep", step.toString());

        if (step === 1) {
          setSelectedProfessional(null);
          setDateTime({ date: "", time: "" });
          localStorage.removeItem("selectedProfessional");
        }
      }
    },
    [currentStep, isServiceSelected, selectedProfessional, dateTime]
  );

  const handleSelectProfessional = (name: string) => {
    setSelectedProfessional(name);
    localStorage.setItem("selectedProfessional", name);
  };

  const handleTimeSelect = (dateTime: { date: string; time: string }) => {
    setDateTime(dateTime);
  };

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    const savedCart = localStorage.getItem("LocalData");
    setIsServiceSelected(savedCart ? JSON.parse(savedCart).length > 0 : false);
  }, [currentStep]);

  return (
    <div>
      <Header />
      <br />
      <div>
        <div className="lg:flex w-[96%] pt-10 mx-auto text-lg mb-4 items-center">
          <button
            className={`px-4 font-semibold ${currentStep === 1 ? "text-light text-xl" : "text-navy"}`}
            onClick={() => handleStepChange(1)}
          >
            Services
          </button>
          <button
            className={`px-4 font-semibold ${currentStep === 2 ? "text-light text-xl" : "text-navy"}`}
            onClick={() => handleStepChange(2)}
            disabled={!isServiceSelected && currentStep < 2}
          >
            Professional
          </button>
          <button
            className={`px-4 font-semibold ${currentStep === 3 ? "text-light text-xl" : "text-navy"}`}
            onClick={() => handleStepChange(3)}
            disabled={!selectedProfessional && currentStep < 3}
          >
            Time
          </button>
          <button
            className={`px-4 font-semibold ${currentStep === 4 ? "text-light text-xl" : "text-navy"}`}
            onClick={() => handleStepChange(4)}
            disabled={(!selectedProfessional || !dateTime.date || !dateTime.time) && currentStep < 4}
          >
            Confirmation
          </button>
        </div>
      </div>
      <div className="lg:flex w-[96%] mx-auto items-center pb-5">
        <div className="h-screen w-full scrollsdown pb-10 transition-all lg:w-[65%] overflow-y-auto">
          {currentStep === 1 && <BookingServices />}
          {currentStep === 2 && (
            <Professional onSelect={handleSelectProfessional} selectedProfessional={selectedProfessional} />
          )}
          {currentStep === 3 && <Time onTimeSelect={handleTimeSelect} />}
        
        </div>
        <div className="h-screen w-full ml-auto transition-all pb-10 overflow-x-hidden scrollsdown lg:w-[35%]">
          <div className="h-[1vh]">
            <div className="flex items-center justify-between mx-auto">
              <div className="w-[32rem]">
                <Cart
                  onContinue={handleNextStep}
                  isLastStep={currentStep === maxSteps}
                  selectedProfessional={selectedProfessional}
                  selectedDate={dateTime.date}
                  selectedTime={dateTime.time}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;