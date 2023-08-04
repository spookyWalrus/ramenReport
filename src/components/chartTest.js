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
import { Bar, getElementAtEvent, getDatasetAtEvent} from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.size = 22;
ChartJS.defaults.color = '#f0bf0e';

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
    legend:{
      labels:{
        font:{
          size: 16,
        },
        color: '#666'
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales:{
    x:{
      ticks:{
        display: true,
        font:{
          size: 16,
        }
      }
    },
    y:{
      ticks:{
        display: true,
        font:{
          size: 14,
        }
      }
    }
  }
};

let theDatas = [5,5,3,2,1,0.3,2,3.2];

// const labels = ['Janguar', 'Fobr', 'March', 'April', 'May', 'June', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum', 'Ramen Resto Yum Yum'];

const labels = ['Janguar', 'Fobr', 'March', 'April', 'May', 'June', ['Ramen Resto', 'Yum Yum'], ['Ramen Resto', 'Yum Yum'], ['Ramen Resto', 'Yum Yum'], ['Ramen Resto', 'Yum Yum'], 'RamenyYummo'];
  // if text.length > 11, split in to array

// const labels = [];

// const dataOb = [{x:5,y:'Jang'},{x:4,y:'Farb'},{x:1.3,y:['RamenResto','Yum yum']},{x:1.3,y:'Resto Yum yum'},{x:1.3,y:'Ramen Yum yum'}]

export const data = {
  labels,
  datasets: [
    {
      label: 'Rank out of 5',
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
    // let point = getDatasetAtEvent(chartRef.current, event);

    console.log(point);
    console.log('index: ',point[0].index,)
    console.log('value: ',point[0].element.$context.raw)
  }

  return <Bar 
            options={options} 
            data={data} 
            ref={chartRef} 
            onClick={onClick} 
          />;
}
