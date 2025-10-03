import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Profile = () => {
  const { currentUser, signOutUser, updateUserInfo } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-65px)]">
        <h2 className="text-xl font-semibold">No user logged in</h2>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserInfo(displayName, photoURL);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-65px)] bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        {!isEditing ? (
          <div className="flex flex-col items-center">
            <img
              src={currentUser.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">
              {currentUser.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-600">{currentUser.email}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Edit Profile
            </button>

            <button
              onClick={signOutUser}
              className="mt-4 bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Log Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col">
            <label className="mb-2 font-semibold">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="border rounded px-3 py-2 mb-4"
              required
            />

            <label className="mb-2 font-semibold">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="border rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 cursor-pointer hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
