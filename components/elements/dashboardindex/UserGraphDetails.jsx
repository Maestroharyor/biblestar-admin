import {FaRegCalendarAlt, FaLongArrowAltUp} from 'react-icons/fa'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [50,1000,100,101],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

function UserGraphDetails() {

    return (
        <div className='hidden md:block lg:col-span-2 bg-gray-100 rounded px-8 py-3 '>
            <div className='flex justify-between'>
                <h6 className='font-bold text-xl'>Attempt Rate</h6>
                <p className="inline-flex items-center text-lg gap-3"><span className='text-sm'>Aug - Oct 2022</span><FaRegCalendarAlt /></p>
            </div>
            <Line
            // options={options}
            data={data}
            />
            <div className='mt-3'>
                <p className='text-gray-600'>Total Attempt</p>
                <p className='text-3xl font-bold'>Total Attempt</p>
                <p className='text-green-700 inline-flex items-center gap-1 font-semibold'><FaLongArrowAltUp /><span>7.00%</span></p>
            </div>
            
        </div>
    )
}

export default UserGraphDetails
