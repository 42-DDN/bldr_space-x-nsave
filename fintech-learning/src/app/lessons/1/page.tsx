"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import UserProfileCard from "../../components/UserProfileCard";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = parseInt(params.id as string, 10) || 1;
  
  const totalLessons = 10;

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);

  const stepImages = [
    "/images/nsave/Home screen.png",
    "/images/nsave/invest home.png",
    "/images/nsave/add money for invest.jpg",
    "/images/nsave/Add Money.jpg",
    "/images/nsave/search_for_your_stock.jpeg",
    "/images/nsave/stock_detail.jpg",
  ];

  const stepInstructions = [
    "Locate and click the 'Invest' button at the bottom of the screen.",
    "Find the 'Add Funds' button and click it to proceed.",
    "Click on the 'Enter Amount' field to input your investment amount.",
    "Review your amount and click the 'Add Money' button to proceed.",
    "click on the 'Search' field to look up your .",
    "Find and click the 'Buy' button to purchase the selected stock.",
    "Complete the transaction by clicking the 'Finish' button.",   
  ];

  const clickableRegions = [
    [53, 92, 58, 97],
    [35, 82, 47, 88],
    [32, 24, 50, 30],
    [32, 85, 68, 90],
    [34, 5, 60, 9],
    [42, 83, 58, 90],
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
    const imageContainer = e.currentTarget;
    const rect = imageContainer.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const region: ClickableRegion = {
      x1: clickableRegions[step - 1][0],
      y1: clickableRegions[step - 1][1],
      x2: clickableRegions[step - 1][2],
      y2: clickableRegions[step - 1][3],
    };
    
    if (region && 
        x >= region.x1 && x <= region.x2 && 
        y >= region.y1 && y <= region.y2) {
      // Correct region clicked
      if (step < stepImages.length) {
        setStep(step + 1);
        setProgress((step / stepImages.length) * 100);
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

  const handleNextLesson = () => {
    if (lessonId < totalLessons) {
      router.push(`/lessons/${lessonId + 1}`);
    } else {
      console.log("This is the last lesson.");
    }
  };

  const handlePrevLesson = () => {
    if (lessonId > 1) {
      router.push(`/lessons/${lessonId - 1}`);
    } else {
      console.log("This is the first lesson.");
    }
  };

  useEffect(() => {
    setStep(1);
    setProgress(0);
    setShowFinishModal(false);
  }, [lessonId]);

  return (
    <div className="min-h-screen h-full bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left sidebar with user profile - 25% width */}
        <div className="hidden lg:block lg:w-1/4 self-start sticky top-6">
          <UserProfileCard totalLessons={totalLessons} currentLesson={lessonId} />
        </div>
        
        {/* Main Lesson Container - 75% width */}
        <div className="flex-1 bg-white shadow-xl rounded-xl overflow-hidden relative">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2">
            <div
              className="bg-blue-600 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Lesson Title Bar */}
          <div className="bg-gray-50 border-b border-gray-200 py-4 px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Investment Lesson {lessonId}</h1>
              <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-medium">
                Step {step} of {stepImages.length}
              </span>
            </div>
          </div>

          {/* Container split into left and right panels */}
          <div className="flex flex-col md:flex-row" style={{ height: "calc(100vh - 180px)" }}>
            {/* Left Panel: Instructions and Steps List */}
            <div className="p-8 md:w-1/3 bg-white border-r border-gray-100 flex flex-col h-full overflow-y-auto">
              {/* Lesson Header */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">How to Invest in Stocks</h2>
                <p className="text-gray-600">Follow the step-by-step instructions below. Click on the highlighted areas in the mobile app interface to proceed.</p>
              </div>
              
              {/* Steps Section */}
              <div className="flex-grow">
                <h3 className="text-base font-semibold mb-5 text-gray-700 uppercase tracking-wide">Instructions</h3>
                <div className="space-y-4">
                  {stepInstructions.map((instruction, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 shadow-sm transition-all duration-300 ${
                        index + 1 === step
                          ? "bg-blue-50 border-blue-500 shadow-md"
                          : index < step
                          ? "bg-green-50 border-green-500 opacity-75"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <div className="flex items-start">
                        <span className="flex-shrink-0 w-7 h-7 bg-gray-800 text-white rounded-full text-center text-sm mr-3 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <p className="font-medium text-gray-800">
                          {instruction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-8 text-center py-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Progress: <span className="font-semibold">{Math.round(progress)}% Complete</span>
                </p>
              </div>
            </div>

            {/* Right Panel: Interactive Image */}
            <div className="md:w-2/3 bg-gray-50 relative" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '2rem' }}>
              {/* Interactive phone simulator container */}
              <div 
                className="relative cursor-pointer"
                onClick={handleImageClick}
                style={{ width: "100%", height: "90%" }}
              >
                {/* Phone display container */}
                <div className="relative" style={{ height: "100%", display: "flex", justifyContent: "center" }}>
                  <img
                    src={stepImages[step - 1]}
                    alt={`Step ${step}: ${stepInstructions[step - 1]}`}
                    className="rounded-xl shadow-lg"
                    style={{ 
                      height: "100%", 
                      objectFit: "contain",
                      maxWidth: "100%", 
                      display: "block" 
                    }}
                  />
                  
                  {/* Visual indicator for clickable region */}
                  {step <= clickableRegions.length && (
                    <div 
                      className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30 animate-pulse pointer-events-none rounded-2xl"
                      style={{
                        left: `${clickableRegions[step-1][0]}%`,
                        top: `${clickableRegions[step-1][1]}%`,
                        width: `${clickableRegions[step-1][2] - clickableRegions[step-1][0]}%`,
                        height: `${clickableRegions[step-1][3] - clickableRegions[step-1][1]}%`,
                        zIndex: 10
                      }}
                    />
                  )}
                </div>
                
                {/* Incorrect click feedback */}
                {showIncorrectFeedback && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce z-20">
                    Click on the highlighted blue area to continue
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lesson Navigation: Prev and Next Lesson Buttons */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={handlePrevLesson}
              className="px-5 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition duration-300 shadow-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous Lesson
            </button>
            <button
              onClick={handleNextLesson}
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm flex items-center"
            >
              Next Lesson
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Finish Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm pointer-events-auto"></div>
          <div className="bg-white rounded-xl p-10 shadow-2xl text-center max-w-md mx-4 pointer-events-auto transform transition-all duration-300 z-50 border border-gray-200">
            <div className="bg-green-100 w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Congratulations!</h2>
            <p className="text-xl mb-2 text-gray-600">You've mastered Lesson {lessonId}</p>
            <p className="text-gray-500 mb-8">You now understand how to invest in stocks through the app.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowFinishModal(false)}
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300 shadow-sm"
              >
                Review Lesson
              </button>
              <button
                onClick={() => {
                  setShowFinishModal(false);
                  handleNextLesson();
                }}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm"
              >
                Continue to Next Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}