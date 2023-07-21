import React, { useContext, useEffect, useState } from 'react'
import '../styles/detailProduct.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../assets/Context'

function DetailProductModal(props) {
    const { SERVER_URL } = useContext(Context)
    const [property, setProperty] = useState()

    useEffect(() => {
        axios.get(`${SERVER_URL}/getProperty/${props.propertyDetail}`)
        .then(data => setProperty(data.data))
        console.log(property);
    }, [])

    return (
        <section className='properyDetailSection'>
            <Link to={'/properties'} onClick={() => props.setPropertyDetail('')} className='generalModalBackground detailProductModalBackground'></Link>
            <div className='properyDetailModal'>
                <button className='closeModal' onClick={() => props.setPropertyDetail('')}></button>
                <div className='propertyImages'>
                    {/* <p>{property.address}</p> */}
                </div>
            </div>
        </section>
    )
}

export default DetailProductModal