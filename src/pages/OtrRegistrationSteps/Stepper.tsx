import React from "react";

interface StepperProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, setCurrentStep }) => {
  const steps = [
    "Personal Details",
    "Professional Details",
    "Additional Details",
    "Upload Documents",
    "Declaration",
  ];

  return (
    <div className="relative flex items-center justify-between max-w-5xl mx-auto mb-10 px-6">
      {/* Background Line */}
      <div className="absolute top-5 left-[5%] right-[5%] h-0.5 bg-gray-300 z-0 rounded-full"></div>

      {/* Active Line */}
      <div
        className="absolute top-5 left-[5%] h-0.5 bg-pink-500 z-10 transition-all duration-500 rounded-full"
        style={{
          width: `calc(${((currentStep - 1) / (steps.length - 1)) * 90}% )`,
        }}
      ></div>

      {/* Steps */}
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div
            key={index}
            className={`flex flex-col items-center z-20 ${
              isCompleted ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={() => {
              if (isCompleted || isActive) setCurrentStep(stepNumber);
            }}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
              ${
                isCompleted
                  ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
                  : isActive
                  ? "bg-pink-500 border-pink-500 text-white"
                  : "border-gray-300 text-gray-500 bg-white"
              }`}
            >
              {stepNumber}
            </div>
            <p
              className={`text-xs text-center mt-2 font-medium hidden md:block ${
                isActive ? "text-pink-600" : "text-gray-500"
              }`}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Stepper);
