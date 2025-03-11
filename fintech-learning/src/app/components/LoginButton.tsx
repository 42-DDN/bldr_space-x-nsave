// src/app/components/LoginButton.tsx
"use client";

import { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase/config";
import { User } from "firebase/auth"; // Import the User type

export default function LoginButton() {
  // Explicitly type the user state as User | null
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set the User object
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Reset the user to null
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={handleLogout} className="mt-2 bg-red-500 px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 px-4 py-2 rounded-lg">
          Sign in with Google
        </button>
      )}
    </div>
  );
}
