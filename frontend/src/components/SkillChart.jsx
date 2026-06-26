import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SkillChart({ skills, interests }) {

  const skillCount = skills
    ? skills.split(",").length
    : 0;

  const interestCount = interests
    ? interests.split(",").length
    : 0;

  const data = {
    labels: ["Skills", "Interests"],
    datasets: [
      {
        data: [skillCount, interestCount],
        backgroundColor: [
          "#3B82F6",
          "#10B981"
        ],
        borderColor: [
          "#2563EB",
          "#059669"
        ],
        borderWidth: 2
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Profile Analytics
      </h2>

      <Pie data={data} options={options} />
    </div>
  );
}

export default SkillChart;