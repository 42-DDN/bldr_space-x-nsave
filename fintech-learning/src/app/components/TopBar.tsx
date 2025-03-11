// components/TopBar.js
export default function TopBar() {
    return (
      <div className="flex justify-between items-center p-4 bg-red-600 shadow-md">
        {/* Logo/Brand name on the left */}
        <div className="text-2xl font-semibold text-white">
          nsave
        </div>
        
        {/* Links on the right with space between */}
        <div className="space-x-8 text-white">
          <a href="/login" className="text-white font-medium hover:text-gray-200 transition-colors">Login</a>
          <a href="/about" className="text-white font-medium hover:text-gray-200 transition-colors">About</a>
          <a href="/contact" className="text-white font-medium hover:text-gray-200 transition-colors">Contact</a>
        </div>
      </div>
    );
  }
  