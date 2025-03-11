import Link from "next/link";
import LoginButton from "../components/LoginButton";

export default function Learn() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center page-background text-red-900 p-4">
      <h1 className="text-3xl font-bold">Investment Learning Modules 📚</h1>
      <p className="mt-4 text-lg">Choose a lesson and start learning.</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/lesson/1" className="bg-red-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-red-700">
          📈 Lesson 1: Basics of Investing
        </a>
        <a href="/lesson/2" className="bg-red-600 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-red-700">
          💰 Lesson 2: Managing Risk
        </a>
      </div>
    </main>
  );
}
