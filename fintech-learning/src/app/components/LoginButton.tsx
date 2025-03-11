"use client";

import { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase/config";
import { User } from "firebase/auth";

export default function LoginButton() {
  const [user, setUser] = useState<null | User>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
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
