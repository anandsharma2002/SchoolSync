import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const server_url = import.meta.env.VITE_API_URL || "https://localhost:7266";
interface Props {
  onClose: () => void;
  onSwitch: () => void;
}

const LoginForm: React.FC<Props> = ({ onClose, onSwitch }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setAuthenticated } = useAuth(); // ⬅️ get auth setter from context
  const navigate = useNavigate(); // ⬅️ navigate after login

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        password: formData.password,
      };

      // 🔐 Step 1: Send login request
      const res = await fetch(`${server_url}/api/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Required for HttpOnly cookies
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const json = await res.json();
      console.log("Login Response:", json);

      // ✅ If using cookies for auth (HttpOnly), token is auto-stored by the browser.
      // No need to save it manually in localStorage.
      // However, if switching to token-based auth, uncomment this:
      // localStorage.setItem("token", json.token);

      // ✅ Optional: Verify login by hitting a protected endpoint
      const protectedRes = await fetch(`${server_url}/api/Auth/me`, {
        method: "GET",
        credentials: "include", // Required to send cookie
        // If using token manually: 
        // headers: { Authorization: `Bearer ${json.token}` },
      });

      if (!protectedRes.ok) {
        throw new Error("Authenticated request failed");
      }

      const protectedData = await protectedRes.json();
      console.log("Authenticated user info:", protectedData);

      // ✅ Update auth context
      setAuthenticated(true);
      alert("Login successful!");
      onClose(); // close modal
      navigate("/dashboard"); // ✅ navigate to dashboard

    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    }
  };




  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        placeholder="Username"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Password"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-bold hover:scale-105 transition"
      >
        Login
      </button>
      <p className="text-sm text-center text-gray-600 mt-4">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary-600 hover:underline font-medium"
        >
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
