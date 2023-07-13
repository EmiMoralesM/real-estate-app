import React from 'react'
import aboutImg from '../../assets/imgs/about-img.webp'

function About() {
    return (
        <section className='aboutSection'>
            <img src={aboutImg} alt="" />
            <div className=''>
                <p>ABOUT US</p>
                <h2>Re-imagining real estate <span>since 1982</span></h2>
                <p className='aboutText'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore temporibus minus, veritatis vero, quo, molestias reprehenderit non beatae vitae ducimus nisi. Atque iste quam deserunt neque assumenda eaque nobis obcaecati.</p>
            </div>
        </section>
    )
}

export default About