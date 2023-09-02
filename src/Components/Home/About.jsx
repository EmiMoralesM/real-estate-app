import React from 'react'
import aboutImg from '../../assets/imgs/about-img.webp'

function About() {
    return (
        <section className='aboutSection'>
            <img src={aboutImg} alt="" />
            <div className=''>
                <p>ABOUT US</p>
                <h2>Re-imagining real estate <span>since 1992</span></h2>
                <p className='aboutText'>Since 1992, we've been reshaping real estate. Our app offers unparalleled listings, market insights, and a seamless experience for buying, and selling your properties. Welcome to the future of real estate.</p>
            </div>
        </section>
    )
}

export default About