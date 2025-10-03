import React from "react";
import { useParams, useNavigate } from "react-router";

// mock data (in real app, fetch by id)
const eventsData = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "2025-10-20",
    location: "Dhaka, Bangladesh",
    seats: 100,
    description: "A big conference about technology trends in 2025.",
    organizer: "Tech Community Bangladesh",
    deadline: "2025-10-15",
    fee: "$50",
    image: "https://via.placeholder.com/600x300",
  },
  {
    id: 2,
    title: "Startup Meetup",
    date: "2025-11-02",
    location: "Chittagong, Bangladesh",
    seats: 50,
    description: "Networking and pitching for startups.",
    organizer: "Startup Hub BD",
    deadline: "2025-10-28",
    fee: "Free",
    image: "https://via.placeholder.com/600x300",
  },
];

export function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find((e) => e.id === parseInt(id));

  if (!event) return <h2 className="p-6">Event not found.</h2>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={event.image} alt={event.title} className="w-full rounded mb-4" />
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600">
        {event.date} | {event.location}
      </p>
      <p className="mt-2">{event.description}</p>

      <div className="mt-4 bg-gray-100 p-4 rounded">
        <p>
          <strong>Organizer:</strong> {event.organizer}
        </p>
        <p>
          <strong>Registration Deadline:</strong> {event.deadline}
        </p>
        <p>
          <strong>Available Seats:</strong> {event.seats}
        </p>
        <p>
          <strong>Fee:</strong> {event.fee}
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
