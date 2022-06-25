import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {FaPowerOff} from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "White", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(210, 194, 174, 1)",
        "rgba(255, 255, 255, 1)",
        "rgba(255, 246, 0, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderColor: [
        "rgba(210, 194, 174, 1)",
        "rgba(255, 255, 255, 1)",
        "rgba(255, 246, 0, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function UserStatsSummary() {
    return (
        <div className='flex flex-col items-center gap-7'>
            <Doughnut data={data} />
            <Doughnut data={data} />
            {/* <button className='bg-gray-700 hover:bg-gray-900 px-5 py-3 text-3xl transition duration-300 ease-in-out text-white text-center flex items-center justify-center rounded'><FaPowerOff /></button> */}
        </div>
    )
}

export default UserStatsSummary
