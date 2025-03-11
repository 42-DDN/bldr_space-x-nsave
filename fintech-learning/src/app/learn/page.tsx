import Link from "next/link";
import LoginButton from "../components/LoginButton"; // Make sure to import LoginButton

export default function Learn() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold">Investment Learning Modules 📚</h1>
      <p className="mt-4 text-lg text-gray-300">Choose a lesson and start learning.</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/lesson/1">
          <button className="bg-purple-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700">
            📈 Lesson 1: Basics of Investing
          </button>
        </Link>
        <Link href="/lesson/2">
          <button className="bg-green-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-green-700">
            💰 Lesson 2: Managing Risk
          </button>
        </Link>
        <br />
          {/* Add LoginButton to the page */}
          <LoginButton />
          
      </div>
    </main>
  );
}
