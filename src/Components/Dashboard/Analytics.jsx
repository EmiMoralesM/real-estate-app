import React, { useContext, useEffect, useState } from 'react'
import Chart_1 from './Charts/Chart_1'
import Chart_3 from './Charts/Chart_3'
import Chart_5 from './Charts/Chart_5'
import Chart_4 from './Charts/Chart_4'
import axios from 'axios'
import { Context } from '../../assets/Context'


function Analytics() {
    const { SERVER_URL } = useContext(Context)
    const [countProperties, setCountProperties] = useState()
    const [totalProperties, setTotalProperties] = useState(0)
    const [countUsers, setCountUsers] = useState()
    useEffect(() => {
        const countProps = async () => {
            await axios.get(`${SERVER_URL}/countProperties`)
                .then(res => {
                    Object.values(res.data).forEach(amount => {
                        setTotalProperties(prevTotal => prevTotal + amount)
                    })
                    setCountProperties(res.data)
                })
                .catch(err => console.log(`Error: ${err}`))
            await axios.get(`${SERVER_URL}/countUsers`)
                .then(res => setCountUsers(res.data))
                .catch(err => console.log(`Error: ${err}`))
        }
        countProps()
    }, [])

    return (
        <>
            <div className='chart_block_1'>
                {(!countUsers) && <div className='chart_div chart_1 chart-loading'>

                </div>}
                {countUsers && <Chart_1 totalProperties={totalProperties} countProperties={countProperties} />}
                <div className='charts_2_3'>
                    <div className='chart_2'>
                        {!countUsers && <div className='propertiesSold chart-loading' />}
                        {countUsers && <div className='propertiesSold'>
                            <div>
                                <p>Properties Sold</p>
                                <p>{Intl.NumberFormat().format(203)}</p>
                                <p><span className='green'>10% </span> vs last/month</p>
                            </div>
                            <div className='chart2Icon'><p></p></div>
                        </div>}
                        {!countUsers && <div className='newUsers chart-loading' />}
                        {countUsers && <div className='newUsers'>
                            <div>
                                <p>Total Users</p>
                                <p>{Intl.NumberFormat().format(countUsers)}</p>
                                <p><span className='green'>22% </span>vs last/week</p>
                            </div>
                            <div className='chart2Icon'><p></p></div>
                        </div>}
                        {!countUsers && <div className='propertiesForSale chart-loading' />}
                        {countUsers && <div className='propertiesForSale'>
                            <div>
                                <p>Properties <span className='hide1600'>For Sale </span></p>
                                <p>{Intl.NumberFormat().format(totalProperties)}</p>
                                <p ><span className='red'>-5% </span>vs last/month</p>
                            </div>
                            <div className='chart2Icon'><p></p></div>
                        </div>}
                    </div>
                    {!countUsers && <div className='chart_3 chart_div chart-loading'></div>}
                    {countUsers && <Chart_3 />}
                </div>
            </div>
            <div className='chart_block_2'>
                {!countUsers && <div className='chart_4 chart_div chart-loading'></div>}
                {countUsers && <Chart_4 totalProperties={totalProperties} />}
                {!countUsers && <div className='chart_5 chart_div chart-loading'></div>}
                {countUsers && <Chart_5 countUsers={countUsers} />}
            </div>
        </>

    )
}

export default Analytics