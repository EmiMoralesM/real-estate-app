import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function Chart_1(props) {

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['Houses', 'Townhomes', 'Multy-family', 'Condos/Co-ops'],
        datasets: [
            {
                label: 'Properties',
                data: [
                    props.countProperties.House,
                    props.countProperties.Townhouse,
                    props.countProperties['Multy-family'],
                    props.countProperties.Condo,
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                hoverBackgroundColor: [
                    'rgba(54, 162, 235)',
                    'rgba(255, 99, 132)',
                    'rgba(255, 206, 86)',
                    'rgba(255, 159, 64)',
                ]
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
                <p>Total Properties: <span>{props.totalProperties}</span></p>
            </div>
            <div>
                <Doughnut data={data} options={options} />
            </div>
            <div className='chartInfo'>
                <ul>
                    <li className='multiFamily'>Multy-family:
                        <span>{((props.countProperties['Multy-family'] * 100) / props.totalProperties).toFixed(0)}%</span>
                    </li>
                    <li className='houses'>Houses:
                        <span>{((props.countProperties.House * 100) / props.totalProperties).toFixed(0)}%</span>
                    </li>
                    <li className='townhomes'>Townhomes:
                        <span>{((props.countProperties.Townhouse * 100) / props.totalProperties).toFixed(0)}%</span>
                    </li>
                    <li className='condos'>Condos/Co-ops:
                        <span>{((props.countProperties.Condo * 100) / props.totalProperties).toFixed(0)}%</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Chart_1