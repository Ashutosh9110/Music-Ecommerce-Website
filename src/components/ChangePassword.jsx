import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_KEY = "YOUR_API_KEY"; // TODO: Replace with your actual API key

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { auth, login } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center">
        <p className="text-red-600 font-semibold">You must be logged in to change your password.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: auth.idToken,
            newPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        throw new Error(data.error?.message || "Password update failed!");
      }
      // Update token in context
      login(data.idToken, auth.email);
      setSuccess("Password updated successfully! Please use your new password next time.");
      setNewPassword("");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            autoComplete="new-password"
          />
        </div>
        <div>
          {!isLoading && (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition-colors"
            >
              Update Password
            </button>
          )}
          {isLoading && (
            <div className="flex flex-col items-center py-2">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-indigo-600 mb-2"></div>
              <span className="text-gray-600">Updating...</span>
            </div>
          )}
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-center font-medium">
            {success}
          </div>
        )}
      </form>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:underline font-semibold mt-2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
