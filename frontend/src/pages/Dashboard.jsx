import { useState } from "react";
import SkillChart from "../components/SkillChart";
import jsPDF from "jspdf";

function Dashboard() {
  const [data, setData] = useState({
    skills: "",
    interests: ""
  });

  const [career, setCareer] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
        "https://careerpath-backend-szag.onrender.com/api/skills",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (response.ok) {
      const recommendation = await fetch(
        `https://careerpath-backend-szag.onrender.com/api/recommend?skills=${data.skills}&interests=${data.interests}`
      );

      const result = await recommendation.text();

      setCareer(result);

      alert("Saved Successfully!");
    } else {
      alert("Failed to save.");
    }
  };

  const logout = () => {
    window.location.href = "/";
  };

  const getRoadmap = () => {
    switch (career) {
      case "Backend Developer":
        return [
          "Learn Java",
          "Learn Spring Boot",
          "Learn SQL",
          "Build REST APIs",
          "Learn Microservices"
        ];

      case "AI Engineer":
        return [
          "Learn Python",
          "Learn NumPy & Pandas",
          "Learn Machine Learning",
          "Learn TensorFlow",
          "Build AI Projects"
        ];

      case "Cloud Engineer":
        return [
          "Learn Linux",
          "Learn AWS",
          "Learn Docker",
          "Learn Kubernetes",
          "Learn CI/CD"
        ];

      case "Data Analyst":
        return [
          "Learn SQL",
          "Learn Python",
          "Learn Power BI",
          "Learn Statistics",
          "Build Dashboards"
        ];

      default:
        return [
          "Learn DSA",
          "Build Projects",
          "Prepare for Interviews"
        ];
    }
  };

  const getCareerDetails = () => {
    switch (career) {
      case "Backend Developer":
        return {
          salary: "Rs. 6-15 LPA",
          growth: "Senior Developer to Software Architect"
        };

      case "AI Engineer":
        return {
          salary: "Rs. 10-25 LPA",
          growth: "ML Engineer to AI Scientist"
        };

      case "Cloud Engineer":
        return {
          salary: "Rs. 8-18 LPA",
          growth: "DevOps Engineer to Cloud Architect"
        };

      case "Data Analyst":
        return {
          salary: "Rs. 5-12 LPA",
          growth: "Senior Analyst to Data Scientist"
        };

      default:
        return {
          salary: "Rs. 4-10 LPA",
          growth: "Software Development"
        };
    }
  };

  const getTechnologies = () => {
    switch (career) {
      case "Backend Developer":
        return ["Java", "Spring Boot", "MySQL", "REST API"];

      case "Cloud Engineer":
        return ["AWS", "Docker", "Kubernetes", "Linux"];

      case "AI Engineer":
        return ["Python", "TensorFlow", "Pandas", "Scikit-Learn"];

      case "Data Analyst":
        return ["SQL", "Power BI", "Excel", "Python"];

      default:
        return ["DSA", "Git", "Projects"];
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("CareerPath AI Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`Skills: ${data.skills}`, 20, 40);
    doc.text(`Interests: ${data.interests}`, 20, 55);
    doc.text(`Recommended Career: ${career}`, 20, 75);

    doc.text(
      `Average Salary: ${getCareerDetails().salary}`,
      20,
      95
    );

    doc.text(
      `Growth Path: ${getCareerDetails().growth}`,
      20,
      110
    );

    doc.text("Learning Roadmap:", 20, 130);

    let y = 145;

    getRoadmap().forEach((step) => {
      doc.text(`- ${step}`, 25, y);
      y += 10;
    });

    doc.save("CareerPathAI_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">
          CareerPath AI 🚀
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="text-2xl font-bold">
          Welcome 👋
        </h2>

        <p className="text-gray-600 mt-2">
          Explore your skills and discover your ideal career path.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-blue-500 text-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">
            Skills Added
          </h3>
          <p className="text-3xl font-bold mt-2">
            {data.skills
              ? data.skills.split(",").length
              : 0}
          </p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">
            Interests
          </h3>
          <p className="text-3xl font-bold mt-2">
            {data.interests
              ? data.interests.split(",").length
              : 0}
          </p>
        </div>

        <div className="bg-purple-500 text-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">
            Career Match
          </h3>
          <p className="text-xl font-bold mt-2">
            {career || "Not Generated"}
          </p>
        </div>

      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h2 className="text-3xl font-bold text-center mb-6">
          Find Your Career Path
        </h2>

        <form onSubmit={handleSubmit}>

          <label className="font-semibold">
            Skills
          </label>

          <input
            className="w-full border p-3 rounded mt-2 mb-5"
            type="text"
            name="skills"
            placeholder="Java, Python, SQL"
            value={data.skills}
            onChange={handleChange}
          />

          <label className="font-semibold">
            Interests
          </label>

          <input
            className="w-full border p-3 rounded mt-2 mb-5"
            type="text"
            name="interests"
            placeholder="AI, Cloud, Backend"
            value={data.interests}
            onChange={handleChange}
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
            type="submit"
          >
            Get Recommendation
          </button>

        </form>

        {career && (
          <>
            {/* Recommendation */}
            <div className="mt-8 bg-green-100 p-5 rounded-lg">
              <h2 className="text-2xl font-bold text-green-700">
                Recommended Career
              </h2>

              <p className="text-3xl mt-3 font-bold text-blue-700">
                {career}
              </p>
            </div>

            {/* Roadmap */}
            <div className="mt-6 bg-blue-50 p-5 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Learning Roadmap
              </h2>

              <ul className="space-y-2">
                {getRoadmap().map((step, index) => (
                  <li
                    key={index}
                    className="bg-white p-3 rounded shadow"
                  >
                    ✅ {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Insights */}
            <div className="mt-6 bg-yellow-50 p-5 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Career Insights
              </h2>

              <p>
                <strong>Average Salary:</strong>{" "}
                {getCareerDetails().salary}
              </p>

              <p className="mt-2">
                <strong>Growth Path:</strong>{" "}
                {getCareerDetails().growth}
              </p>
            </div>

            {/* Technologies */}
            <div className="mt-6 bg-white p-5 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">
                Recommended Technologies
              </h2>

              <div className="flex flex-wrap gap-3">
                {getTechnologies().map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="mt-6 bg-white p-5 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">
                Career Readiness
              </h2>

              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-green-500 h-6 rounded-full text-white text-center"
                  style={{ width: "75%" }}
                >
                  75%
                </div>
              </div>
            </div>

            {/* Chart */}
            <SkillChart
              skills={data.skills}
              interests={data.interests}
            />

            {/* PDF */}
            <div className="mt-6 text-center">
              <button
                onClick={downloadReport}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg"
              >
                Download PDF Report
              </button>
            </div>

          </>
        )}

      </div>

      <footer className="text-center mt-10 text-gray-500">
        CareerPath AI © 2026
      </footer>

    </div>
  );
}

export default Dashboard;