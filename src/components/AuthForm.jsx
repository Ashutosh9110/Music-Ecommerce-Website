import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false); // false = Sign Up, true = Sign In
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();  
    setIsLoading(true);
    setError("");

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        throw new Error(data.error?.message || (isLogin ? "Authentication failed!" : "Signup failed!"));
      }

      // Success: update auth context, show alert, log idToken, redirect
      login(data.idToken, data.email);
      if (isLogin) {
        alert("Sign in successful!");
      } else {
        alert("Signup successful!");
      }
      if (data.idToken) {
        console.log("JWT idToken:", data.idToken);
      }
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">{isLogin ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={submitHandler} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Your Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            autoComplete="current-password"
          />
        </div>
        <div>
          {!isLoading && (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition-colors"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          )}
          {isLoading && (
            <div className="flex flex-col items-center py-2">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-indigo-600 mb-2"></div>
              <span className="text-gray-600">Sending request...</span>
            </div>
          )}
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center font-medium">
            {error}
          </div>
        )}
      </form>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => { setIsLogin((prev) => !prev); setError(""); }}
          className="text-indigo-600 hover:underline font-semibold mt-2"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}
