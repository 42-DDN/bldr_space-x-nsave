"use client";
import { useState } from 'react';

export default function LessonPage() {
  // Step control
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  // Tracking user progress
  const [clicked, setClicked] = useState(false); // Track if user clicked the correct element

  // Local images for each step (Replace with your actual image names)
  const stepImages = [
    "Untitled.png", // Image for step 1
    "/images/step2.png", // Image for step 2
    "/images/step3.png", // Image for step 3
    "/images/step4.png", // Image for step 4
  ];

  const stepInstructions = [
    "Click on the 'Sign Up' button on the phone.",
    "Click the 'Enter Amount' field.",
    "Click on the 'Invest Now' button.",
    "Click on the 'Finish' button to complete the lesson.",
  ];

  const handleImageClick = () => {
    // Only allow clicking once per step
    if (!clicked) {
      setClicked(true);
      // Move to the next step
      if (step < 4) {
        setStep(step + 1);
        setProgress(progress + 25); // Assuming 4 steps in total
      }
    }
  };

  return (
    <div className="relative bg-white min-h-screen flex flex-col items-center">
      {/* Background Dim */}
      <div className={`absolute inset-0 bg-black opacity-50 ${step === 1 ? 'pointer-events-auto' : 'pointer-events-none'}`} />

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-2 mb-6">
        <div
          className="bg-red-600 h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="w-full max-w-5xl p-4 flex flex-col items-center text-center">
        {/* Local Image for Each Step */}
        <div className="relative w-full h-96 md:h-[calc(100vh-200px)]">
          <img
            src={stepImages[step - 1]} // Use local image for each step
            alt={`Step ${step}`}
            className="w-full h-full object-contain cursor-pointer"
            onClick={handleImageClick} // Track clicks on the image
          />
        </div>

        {/* Instructions Section */}
        <div className="mt-6 w-full max-w-4xl">
          <div className="text-center text-lg md:text-xl text-gray-800 bg-gray-100 p-4 rounded-lg shadow-md">
            <p>{stepInstructions[step - 1]}</p>
          </div>
        </div>

        {/* "Next Step" Button */}
        {step < 4 && (
          <button
            onClick={handleImageClick}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}
