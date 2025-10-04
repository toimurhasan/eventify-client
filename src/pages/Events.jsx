import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:3000/all-events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading events...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event._id} className="border rounded-xl shadow p-4">
          <img src={event.imageURL} alt={event.name} className="w-full h-40 object-cover rounded" />
          <h2 className="text-xl font-semibold mt-2">{event.name}</h2>
          <p className="text-gray-600">
            {event.date} | {event.location}
          </p>
          <p className="text-sm text-gray-500">Organizer: {event.organizerName}</p>
          <p className="text-sm text-gray-500">Seats Available: {event.seats}</p>

          <Link
            to={`/events/${event._id}`}
            className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}
