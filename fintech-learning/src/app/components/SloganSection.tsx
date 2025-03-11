// components/SloganSection.js
export default function SloganSection() {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-center px-6 md:px-12">
          {/* Animated Slogan */}
          <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-6 animate__animated animate__fadeIn animate__delay-1s">
            nsave, your money and future in one place
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Start your investment journey today with nsave, and take control of your financial future.
          </p>
          {/* Learn More Button */}
          <button className="inline-block px-6 py-3 mt-4 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out">
            <a href="../learn" className="text-black">
            Learn More
            </a>
          </button>
        </div>
      </div>
    );
  }
  