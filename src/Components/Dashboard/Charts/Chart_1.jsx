import React from 'react'
import { Link } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function Chart_1() {
    
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Houses', 'Townhomes', 'Multy-family', 'Condos/Co-ops', 'Apartments'],
        datasets: [
            {
                label: 'Properties',
                data: [335, 204, 359, 140, 253],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)    ',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                hoverBackgroundColor: [
                    'rgba(54, 162, 235)',
                    'rgba(75, 192, 192)',
                    'rgba(255, 99, 132)    ',
                    'rgba(255, 206, 86)',
                    'rgba(255, 159, 64)',
                ],
            },
        ],
    };
    const options = {
        borderWidth: 8,
        borderRadius: 8,
        hoverBorderWidth: 5,
        label: 0,
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
                titleAlign: 'center',
                bodyAlign: 'center'
            },
            legend: {
                display: false,
            }
        }
    }
    return (
        <div className='chart_1 chart_div'>
            <div className='titleChat'>
                <p>Property Types</p>
                <p>Total Properties: <span>2,572</span></p>
            </div>
            <div>
                <Doughnut data={data} options={options} />
            </div>
            <div className='chartInfo'>
                <ul>
                    <li className='multiFamily'>Multy-family: <span>30%</span></li>
                    <li className='houses'>Houses: <span>20%</span></li>
                    <li className='townhomes'>Townhomes: <span>20%</span></li>
                    <li className='condos'>Condos/Co-ops: <span>20%</span></li>
                    <li className='aparments'>Apartments: <span>10%</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Chart_1