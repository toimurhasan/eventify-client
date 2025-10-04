import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch("http://localhost:3000/all-events");
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        const found = data.find((e) => e._id === id);
        setEvent(found || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading event...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!event) return <h2 className="p-6">Event not found.</h2>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={event.imageURL} alt={event.name} className="w-full rounded mb-4" />
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600">
        {event.date} | {event.location}
      </p>
      <p className="mt-2">{event.description}</p>

      <div className="mt-4 bg-gray-100 p-4 rounded">
        <p>
          <strong>Organizer:</strong> {event.organizerName}
        </p>
        <p>
          <strong>Available Seats:</strong> {event.seats}
        </p>
        <p>
          <strong>Category:</strong> {event.category}
        </p>
      </div>

      <button
        onClick={() => alert("Registered successfully!")}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Register Now
      </button>

      <button
        onClick={() => navigate(-1)}
        className="ml-3 mt-4 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back
      </button>
    </div>
  );
}
