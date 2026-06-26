import { useState } from "react";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
     "https://careerpath-backend-szag.onrender.com/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    );

    if (response.ok) {
  alert("Registration Successful!");
  window.location.href = "/";
} else {
  alert("Registration Failed!");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          CareerPath AI
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full border p-3 rounded mb-4"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            className="w-full border p-3 rounded mb-4"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="w-full border p-3 rounded mb-4"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className="w-full bg-green-600 text-white p-3 rounded"
            type="submit"
          >
            Register
          </button>
          <p className="mt-4 text-center">
  Already have an account?
  <a href="/" className="text-blue-600 ml-1">
    Login
  </a>
</p>
        </form>
      </div>
    </div>
  );
}

export default Register;