import React, { useState } from "react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // clear previous error

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        // Show feedback error
        throw new Error(data.error?.message || "Signup failed!");
      }

      console.log("User signed up:", data);
      alert("Signup successful!");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label>Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Your Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          {!isLoading && <button type="submit">Create Account</button>}
          {isLoading && <p>Sending request...</p>}
        </div>

        {/* 🔹 Error Feedback */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
