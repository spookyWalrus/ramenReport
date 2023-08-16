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
    legend:{
      position: 'right',
      labels:{
        font:{
          size: 16,
        },
        color: '#666',
      }
    },
    datalabels:{
      anchor: 'end',
      offset: 0,
      align: 'right'
    },
    tooltip:{
      backgroundColor: '#DB5495',
      borderColor: '#00FFFF'
    },
      calbacks:{
        title: (data) => { return data[0].parsed.x } 
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
  },
  layout: {
    padding: {
      right: 20
    }
  },

};
 
const RamenChart =({dbratings}) => {
  const theDatas = [];
  const labels = [];
  if(dbratings){
    for (const obj of dbratings){
      for(const item in obj){
        if(item.length > 11){
          const label = item.split(' ');
          labels.push(label);
        }else{
          labels.push(item); 
        }
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

  const chartRef = useRef(null);
  const onClick = (event) => {
    let point = getElementAtEvent(chartRef.current, event);
    // let point = getElementsAtEvent(chartRef.current, event);
    // let point = getDatasetAtEvent(chartRef.current, event);
    let idx = point[0].index;
    console.log('index: ',idx)
    console.log('resto: ',labels[idx]);
    // console.log(theDatas);
    // console.log(labels);
  }

  return <Bar 
            options={options} 
            data={data} 
            ref={chartRef} 
            onClick={onClick} 
          />;
}

export default RamenChart;