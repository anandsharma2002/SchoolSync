import React, { useState, useEffect, useRef } from "react";

const server_url = import.meta.env.VITE_API_URL || "https://localhost:7266";
const roles = ["admin", "principal", "schoolIncharge", "teacher", "student", "parent"];

interface Props {
  onClose: () => void;
  onSwitch: () => void;
}

interface School {
  id: string;
  name: string;
}

const RegisterForm: React.FC<Props> = ({ onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    schoolId: "",
  });

  const [schoolSearch, setSchoolSearch] = useState("");
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!schoolSearch.trim()) {
      setSchools([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetch(`${server_url}/api/School/search?schoolName=${encodeURIComponent(schoolSearch)}`)
        .then(async (res) => {
          if (!res.ok) throw new Error(res.statusText);
          const json = await res.json();
          if (!json.isSuccess) throw new Error(json.errorMessage || "Failed to fetch schools");
          setSchools(json.content || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Unknown error");
          setSchools([]);
          setLoading(false);
        });
    }, 400);

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [schoolSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSchoolSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolSearch(e.target.value);
    setShowSchoolDropdown(true);
    setFormData((prev) => ({ ...prev, schoolId: "" }));
  };

  const handleSchoolSelect = (school: School) => {
    setFormData((prev) => ({ ...prev, schoolId: school.id }));
    setSchoolSearch(school.name);
    setShowSchoolDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.schoolId) {
      alert("Please select a school.");
      return;
    }

    try {
      const payload = {
        userName: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        schoolId: formData.schoolId,
      };

      const res = await fetch(`${server_url}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.isSuccess) {
        throw new Error(json.errorMessage || "Registration failed.");
      }

      alert("Registration successful!");


      onSwitch(); // <- opens login form
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 relative px-4 sm:px-6 md:px-0 max-w-md mx-auto"
      aria-label="Register Form"
      autoComplete="off"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center sm:text-left">
        Register
      </h2>

      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
        autoComplete="username"
        aria-label="Username"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
        autoComplete="email"
        aria-label="Email"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
        autoComplete="new-password"
        aria-label="Password"
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
        aria-label="Select Role"
      >
        <option value="">Select Role</option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </option>
        ))}
      </select>

      <div className="relative">
        <input
          type="text"
          placeholder="Search and select school"
          value={schoolSearch}
          onChange={handleSchoolSearchChange}
          onFocus={() => setShowSchoolDropdown(true)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
          autoComplete="off"
          required={!formData.schoolId}
          aria-label="Search and select school"
          aria-autocomplete="list"
          aria-controls="school-listbox"
          aria-expanded={showSchoolDropdown}
          role="combobox"
        />

        {showSchoolDropdown && (
          <>
            {!schoolSearch.trim() && (
              <div className="absolute z-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl mt-1 text-gray-400 text-base sm:text-sm">
                Type school name
              </div>
            )}

            {loading && (
              <div className="absolute z-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl mt-1 text-gray-500 text-base sm:text-sm">
                Loading...
              </div>
            )}

            {error && (
              <div className="absolute z-10 w-full px-4 py-3 bg-red-100 border border-red-300 rounded-xl mt-1 text-red-700 text-base sm:text-sm">
                {error}
              </div>
            )}

            {!loading && !error && schoolSearch.trim() && schools.length > 0 && (
              <ul
                id="school-listbox"
                role="listbox"
                className="absolute z-10 w-full max-h-48 overflow-auto bg-white border border-gray-300 rounded-xl mt-1 shadow-lg"
              >
                {schools.map((school) => (
                  <li
                    key={school.id}
                    role="option"
                    aria-selected={formData.schoolId === school.id}
                    className="px-4 py-3 cursor-pointer hover:bg-primary-600 hover:text-white rounded-xl text-base sm:text-sm"
                    onClick={() => handleSchoolSelect(school)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSchoolSelect(school);
                      }
                    }}
                  >
                    {school.name}
                  </li>
                ))}
              </ul>
            )}

            {!loading && !error && schoolSearch.trim() && schools.length === 0 && (
              <div className="absolute z-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl mt-1 text-gray-500 text-base sm:text-sm">
                No schools found
              </div>
            )}
          </>
        )}

      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-bold hover:scale-105 transition text-lg sm:text-base focus:outline-none focus:ring-4 focus:ring-primary-500"
      >
        Register
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary-600"
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
