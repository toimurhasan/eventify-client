import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { EventDetails } from "./pages/EventDetails";
import { MyBookings } from "./pages/MyBookings";
import { AddEvent } from "./pages/AddEvent";
import { Profile } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventDetails /> },
      { path: "my-bookings", element: <MyBookings /> },
      { path: "add-event", element: <AddEvent /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
