import React from "react";
import { Link } from "react-router";

// sample data (later you’ll fetch from backend)
const eventsData = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "2025-10-20",
    location: "Dhaka, Bangladesh",
    seats: 100,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Startup Meetup",
    date: "2025-11-02",
    location: "Chittagong, Bangladesh",
    seats: 50,
    image: "https://via.placeholder.com/300x200",
  },
];

export function Events() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {eventsData.map((event) => (
        <div key={event.id} className="border rounded-xl shadow p-4">
          <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded" />
          <h2 className="text-xl font-semibold mt-2">{event.title}</h2>
          <p className="text-gray-600">
            {event.date} | {event.location}
          </p>
          <p className="text-sm text-gray-500">Seats Available: {event.seats}</p>
          <Link
            to={`/events/${event.id}`}
            className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}
