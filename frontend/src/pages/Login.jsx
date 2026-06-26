import { useState } from "react";

function Login() {
  const [user, setUser] = useState({
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
      "https://careerpath-backend-szag.onrender.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    );

    const data = await response.text();
    if (data === "Login Successful") {
  window.location.href = "/dashboard";
} else {
  alert(data);
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
            className="w-full bg-blue-600 text-white p-3 rounded"
            type="submit"
          >
            Login
          </button>
          <p className="mt-4 text-center">
  Don't have an account?
  <a href="/register" className="text-blue-600 ml-1">
    Register
  </a>
</p>
        </form>
      </div>
    </div>
  );
}

export default Login;