"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import UserProfileCard from "../../components/UserProfileCard";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = parseInt(params.id as string, 10) || 1;
  
  // For lesson navigation, assume there are 10 lessons.
  const totalLessons = 10;

  // State for in-lesson steps.
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  // State for showing the "Finish" modal overlay.
  const [showFinishModal, setShowFinishModal] = useState(false);
  // State to show incorrect click feedback
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);

  // Images for each step
  const stepImages = [
    "/images/nsave/Home screen.png",
    "/images/nsave/invest home.png",
    "/images/nsave/add money for invest.jpg",
    "/images/nsave/Add Money.jpg",
    "/images/nsave/search_for_your_stock.jpeg",
    "/images/nsave/stock_detail.jpg",
  ];

  // Instructions for each step
  const stepInstructions = [
    "Click on the 'Invest' button on the phone.",
    "Click the 'Add Funds' Button.",
    "Click on the 'Enter Amount' Field.",
    "Click on the 'Add Money' button.",
    "click on buy button to buy the stock",
    "Click on the 'Finish' button to complete the lesson.",   
  ];

  // Define clickable regions for each step
  // Format: [x1, y1, x2, y2] as percentages of the image dimensions
  // Example: [20, 30, 80, 45] means a rectangle from 20% from left, 30% from top,
  // to 80% from left, 45% from top
  const clickableRegions = [
    [53, 91, 63, 98],
    [28, 82, 45, 88],
    [22, 24, 60, 30],
    [22, 85, 78, 90],
    [23, 6, 60, 8],
    [37, 83, 63, 90],
  ];

  interface ClickableRegion {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }

  interface MouseEventWithCurrentTarget extends React.MouseEvent<HTMLDivElement> {
    currentTarget: HTMLDivElement;
  }

  const handleImageClick = (e: MouseEventWithCurrentTarget) => {
    // Get the target image element
    const imageContainer = e.currentTarget;
    const rect = imageContainer.getBoundingClientRect();
    
    // Calculate click position as percentages of the image dimensions
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Get the current step's clickable region
    const region: ClickableRegion = {
      x1: clickableRegions[step - 1][0],
      y1: clickableRegions[step - 1][1],
      x2: clickableRegions[step - 1][2],
      y2: clickableRegions[step - 1][3],
    };
    
    // Check if the click is within the defined region
    if (region && 
        x >= region.x1 && x <= region.x2 && 
        y >= region.y1 && y <= region.y2) {
      // Correct region clicked
      if (step < stepImages.length) {
        setStep(step + 1);
        setProgress(progress + 25);
      } else {
        handleFinish();
      }
      setShowIncorrectFeedback(false);
    } else {
      setShowIncorrectFeedback(true);
      setTimeout(() => setShowIncorrectFeedback(false), 2000);
    }
  };

  const handleFinish = () => {
    setShowFinishModal(true);
  };

  // Proceed to the next lesson.
  const handleNextLesson = () => {
    if (lessonId < totalLessons) {
      router.push(`/lessons/${lessonId + 1}`);
    } else {
      console.log("This is the last lesson.");
    }
  };

  // Navigate to the previous lesson.
  const handlePrevLesson = () => {
    if (lessonId > 1) {
      router.push(`/lessons/${lessonId - 1}`);
    } else {
      console.log("This is the first lesson.");
    }
  };

  // Reset lesson states when the lesson changes.
  useEffect(() => {
    setStep(1);
    setProgress(0);
    setShowFinishModal(false);
  }, [lessonId]);

  return (
    <div className="min-h-screen h-full bg-gray-100 flex p-4">
      <div className="w-full max-w-7xl mx-auto flex gap-6">
        {/* Left sidebar with user profile - 25% width */}
        <div className="hidden lg:block lg:w-1/4 sticky top-4 self-start">
          <UserProfileCard totalLessons={totalLessons} currentLesson={lessonId} />
        </div>
        
        {/* Main Lesson Container - 75% width */}
        <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden relative">
          {/* Progress Bar */}
          <div className="w-full bg-gray-300 h-4">
            <div
              className="bg-red-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Container split into left and right panels */}
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Panel: Instructions and Steps List */}
            <div className="p-8 md:w-1/3 bg-gray-50 flex flex-col h-full overflow-y-auto">
              {/* Lesson Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Lesson {lessonId}</h2>
                <p className="text-gray-600 mt-2">Click on the highlighted areas to complete each step</p>
              </div>
              
              {/* Steps Section */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Step-by-step Instructions</h3>
                <div className="space-y-5">
                  {stepInstructions.map((instruction, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-lg border-l-4 shadow-sm transition-all duration-300 ${
                        index + 1 === step
                          ? "bg-red-50 border-red-600"
                          : index < step
                          ? "bg-red-100 border-red-400 opacity-75"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <p className="font-medium text-gray-800">
                        <span className="inline-block w-6 h-6 bg-gray-800 text-white rounded-full text-center text-sm mr-3">
                          {index + 1}
                        </span>
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Progress: {Math.round(progress)}% Complete
                </p>
              </div>
            </div>

            {/* Right Panel: Interactive Image */}
            <div className="md:w-2/3 relative flex-grow">
              {/* Interactive area container */}
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={handleImageClick}
              >
                {/* Base image */}
                <div className="relative w-full h-full">
                  <Image
                    src={stepImages[step - 1]}
                    alt={`Step ${step}`}
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                </div>
                
                {/* Visual indicator for clickable region */}
                {step <= clickableRegions.length && (
                  <div 
                    className="absolute border-2 border-red-500 bg-red-200 bg-opacity-30 animate-pulse pointer-events-none"
                    style={{
                      left: `${clickableRegions[step-1][0]}%`,
                      top: `${clickableRegions[step-1][1]}%`,
                      width: `${clickableRegions[step-1][2] - clickableRegions[step-1][0]}%`,
                      height: `${clickableRegions[step-1][3] - clickableRegions[step-1][1]}%`,
                    }}
                  />
                )}
                
                {/* Incorrect click feedback */}
                {showIncorrectFeedback && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg animate-bounce">
                    Try clicking on the highlighted area
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lesson Navigation: Prev and Next Lesson Buttons */}
          <div className="absolute inset-x-0 bottom-4 flex justify-between px-6">
            <button
              onClick={handlePrevLesson}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Prev Lesson
            </button>
            <button
              onClick={handleNextLesson}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Next Lesson
            </button>
          </div>
        </div>
      </div>

      {/* Finish Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm pointer-events-auto"></div>
          <div className="bg-white rounded-xl p-8 shadow-2xl text-center max-w-md mx-4 pointer-events-auto transform transition-all duration-300 z-50 border border-gray-200">
            <div className="bg-green-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Congratulations!</h2>
            <p className="mb-6 text-gray-600">You have successfully completed Lesson {lessonId}.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowFinishModal(false)}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Continue Learning
              </button>
              <button
                onClick={() => {
                  setShowFinishModal(false);
                  handleNextLesson();
                }}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
              >
                Next Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}