"use client";

import { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function UserProfileCard({ totalLessons, currentLesson }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-20 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
        <p className="text-gray-600 mb-6">Sign in to track your progress and access all features.</p>
        
        <div className="mb-8">
          <button 
            onClick={handleSignIn} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-lg mb-4">Why sign in?</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Track your lesson progress
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Save your achievements
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Continue where you left off
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // Calculate course progress
  const courseProgress = Math.round((currentLesson / totalLessons) * 100);

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden h-auto flex flex-col">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
        <div className="flex items-center">
          {user.photoURL ? (
            <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mr-4">
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mr-4">
              <span className="text-3xl font-bold text-purple-600">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{user.displayName || "User"}</h2>
            <p className="text-blue-100">{user.email}</p>
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-6 flex-grow">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Course Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
            <div 
              className="bg-blue-600 h-3 rounded-full" 
              style={{ width: `${courseProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Lesson {currentLesson} of {totalLessons}</span>
            <span>{courseProgress}% Complete</span>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Current Session</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700">Lesson {currentLesson}</p>
              <p className="text-sm text-gray-500">In progress</p>
            </div>
            <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-sm border border-gray-200">
              <span className="text-xl font-bold text-blue-600">{currentLesson}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-3xl font-bold text-gray-800">{currentLesson}</p>
            <p className="text-sm text-gray-500">Current Lesson</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-3xl font-bold text-gray-800">{currentLesson - 1 || 0}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
      </div>
      
      {/* Footer section */}
      <div className="px-6 pb-6">
        <button 
          onClick={() => auth.signOut()}
          className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}