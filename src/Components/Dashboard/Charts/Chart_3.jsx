import React from 'react'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function Chart_3() {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      tooltip: {
        position: 'average',
        enabled: true,
        xAlign: 'center',
        displayColors: false,
        backgroundColor: 'rgba(0, 106, 255, 0.8)',
        padding: 12,
        titleFont: { weight: '600', size: 14, family: 'Merriweather Sans' },
        bodyFont: { weight: '400', size: 13, family: 'Merriweather Sans' },
        titleAlign: 'left',
        bodyAlign: 'left'
      },
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 180,
        type: 'linear',
        display: true,
        position: 'left',
        border: {
          // color: '#3b8dff',
          width: 3
        },
        grid: {
          lineWidth: 1,
          tickLength: 10,
          tickWidth: 0,
        },
        ticks: {
          color: '#b4b4b4',
          font: { weight: '500', family: 'Roboto' },
        }
      },
      x: {
        display: false
      }
    },
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: '2023',
        data: [210, 212, 205, 220, 250, 210, 230, 266, 240, 280, 260, 295],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 4,
        yAxisID: 'y',
        tension: .4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: '2022',
        data: [190, 210, 220, 210, 240, 220, 230, 205, 245, 220, 240, 220],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 4,
        yAxisID: 'y',
        tension: .4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      // {
      //   label: '2021',
      //   data: [185, 200, 210, 200, 230, 210, 220, 195, 235, 210, 230, 250],
      //   borderColor: 'rgb(255, 218, 70)',
      //   backgroundColor: 'rgb(255, 218, 70)',
      //   borderWidth: 4,
      //   yAxisID: 'y',
      //   tension: .4,
      //   pointRadius: 0,
      //   pointHoverRadius: 4,
      // },
    ],
  };
  return (
    <div className='chart_3 chart_div'>
      <div className='titleChat'>
        <p>Properties Sold</p>
        <div className='chartInfo chartInfoChart_3'>
          <ul>
            <li className='Y2023'>2023</li>
            <li className='Y2022'>2022</li>
            {/* <li className='Y2021'>2021</li> */}
          </ul>
        </div>
      </div>
      <div className='chart_3Div'>
        <Line options={options} data={data} />

      </div>
    </div>
  )
}

export default Chart_3