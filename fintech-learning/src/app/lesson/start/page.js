
export default function Lesson({ params }) {
    const lessons = {
      1: { title: "Basics of Investing", content: "Investing is about growing your wealth over time..." },
      2: { title: "Managing Risk", content: "Risk management helps protect your investments..." },
    };
  
    const lesson = lessons[params.id] || { title: "Lesson Not Found", content: "Invalid lesson ID." };
  
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-700 text-white p-4">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="mt-4 text-lg text-gray-300">{lesson.content}</p>
        <a href="/learn" className="mt-6 bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600">
          Back to Lessons
        </a>
      </main>
    );
  }
  