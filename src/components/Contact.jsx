import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.issue) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://react-movie-base-185d9-default-rtdb.firebaseio.com/contact.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit. Please try again.");

      setMessage("✅ Your issue has been submitted successfully!");
      setFormData({ name: "", email: "", phone: "", issue: "" });
    } catch (err) {
      setMessage("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Contact Us</h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Describe Your Issue</label>
            <textarea
              name="issue"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Describe your problem here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition-colors"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-lg font-medium text-indigo-700">{message}</p>}
      </div>
    </div>
  );
};

export default Contact;
