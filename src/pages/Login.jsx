import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc"; // For Google icon (optional)
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { signInUser } = use(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then(() => {
        // toast.success("Login Successful.");
        // navigate(location?.state || "/");
        console.log("success");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // toast.error(errorCode);
        console.log(error.code);
      });
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here (Firebase / OAuth)
    console.log("Google login clicked");
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-2 rounded-2xl border border-gray-500 shadow-2xl">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold cursor-pointer text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="space-y-2">
          {/* Google Login Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center cursor-pointer justify-center w-full py-2 mt-3 space-x-2 font-semibold border border-gray-500 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
