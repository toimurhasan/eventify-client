import React, { useState } from "react";

export default function AddEventForm({ onSubmit }) {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(""); // ✅ new state
  const [seats, setSeats] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!eventName.trim()) e.eventName = "Event name is required.";
    if (!date) e.date = "Date is required.";
    if (!location.trim()) e.location = "Location is required.";
    if (!category.trim()) e.category = "Category is required.";
    if (!description.trim()) e.description = "Description is required.";
    if (!imageURL.trim()) e.imageURL = "Image URL is required."; // ✅ validation
    if (!seats || Number(seats) <= 0) e.seats = "Number of seats must be greater than 0.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetForm = () => {
    setEventName("");
    setDate("");
    setLocation("");
    setCategory("");
    setDescription("");
    setImageURL(""); // ✅ reset too
    setSeats(0);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const formData = {
      name: eventName,
      date,
      location,
      category,
      description,
      imageURL, // ✅ included in payload
      seats,
    };

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        const res = await fetch("http://localhost:3000/create-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Server error");
        }
      }

      resetForm();
      alert("Event added successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to add event: " + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-md border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Name</label>
          <input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className={`w-full rounded-lg border p-2 focus:outline-none focus:ring ${
              errors.eventName ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Summer Music Fest"
          />
          {errors.eventName && <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full rounded-lg border p-2 focus:outline-none ${
                errors.date ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full rounded-lg border p-2 focus:outline-none ${
                errors.location ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="City Hall, New York"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full rounded-lg border p-2 focus:outline-none ${
              errors.category ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full rounded-lg border p-2 focus:outline-none ${
              errors.description ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Write a short description of the event..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* ✅ Added controlled Image URL field */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className={`w-full rounded-lg border p-2 focus:outline-none ${
              errors.imageURL ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter Image URL"
          />
          {errors.imageURL && <p className="text-red-500 text-sm mt-1">{errors.imageURL}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Number of seats</label>
          <input
            type="number"
            min={1}
            value={seats}
            onChange={(e) => setSeats(e.target.value ? Number(e.target.value) : "")}
            className={`w-40 rounded-lg border p-2 focus:outline-none ${
              errors.seats ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.seats && <p className="text-red-500 text-sm mt-1">{errors.seats}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:opacity-95 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Add Event"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="cursor-pointer px-4 py-2 rounded-lg border bg-transparent font-medium"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
