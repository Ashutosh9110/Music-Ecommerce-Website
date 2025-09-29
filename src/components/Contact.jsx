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
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Contact Us</h2>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-3">
          <label>Describe Your Issue</label>
          <textarea
            name="issue"
            className="form-control"
            rows="4"
            value={formData.issue}
            onChange={handleChange}
            placeholder="Describe your problem here"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>

      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default Contact;
