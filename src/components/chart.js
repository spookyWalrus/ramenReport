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
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

Chart.register(ChartDataLabels);

ChartJS.defaults.font.size = 20;
ChartJS.defaults.color = '#f0bf0e';


export const options = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  // barThickness: 'flex',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: 'right',
    },
    legend:{
      labels:{
        font:{
          size: 16,
        },
        color: '#666'
      }
    },
    datalabels:{
      anchor: 'end',
      offset: 0,
      align: 'right'
    }
  },
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
 
const RamenChart =({dbratings}) => {
  const theDatas = [];
  const labels = [];
  if(dbratings){
    for (const obj of dbratings){
      for(const item in obj){
        labels.push(item); 
        theDatas.push(obj[item]);
      }
    }
  }
 

  const data = {
    labels,
    datasets: [
      { label: 'Rank out of 5',
        data: theDatas,
        title: theDatas,
        borderColor: '#A154DB',
        backgroundColor: '#5720a8'
      }
    ],
  };

  // const chartRef = useRef(null);
  // const onClick = (event) => {
  //   let point = getElementAtEvent(chartRef.current, event);
    // let point = getDatasetAtEvent(chartRef.current, event);

    // console.log('index: ',point[0].index,)
    // console.log('value: ',point[0].element.$context.raw)
    // console.log(theDatas);
    // console.log(labels);
  // }

  return <Bar 
            options={options} 
            data={data} 
            // ref={chartRef} 
            // onClick={onClick} 
          />;
}

export default RamenChart;