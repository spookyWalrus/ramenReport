import {useRef} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, getElementAtEvent} from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Best Ramen in your area',
    },
  },
 
};

let theDatas = [5,5,3,2,1,0.3,1,2,1,2,4];

const labels = ['Janguar', 'Fobr', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Ramen rank',
      data: theDatas,
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 5 })
      //   console.log()),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export default function ChartTest() {
  const chartRef = useRef(null);
  const onClick = (event) => {
    let point = getElementAtEvent(chartRef.current, event);
    console.log(point.context.raw)
  }

  return <Bar 
            options={options} 
            data={data} 
            ref={chartRef} 
            onClick={onClick} 
          />;
}
