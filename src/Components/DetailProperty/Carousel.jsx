import React, { useEffect, useRef, useState } from 'react'

function Carousel(props) {
    const [indexCarousel, setIndexCarousel] = useState(0)

    const carouselRef = useRef()

    // Every time the indexCarousel changes it scrolls into that image
    useEffect(() => {
        // Select the current img (indexCarousel) of the carrousel (use the ref asigned to the ul that contais all images)
        const carouselImg = carouselRef.current.querySelectorAll("li > img")[indexCarousel]

        // Scroll into the image selected
        if (carouselImg) {
            carouselImg.scrollIntoView({
                behavior: "smooth"
            })
        }
    }, [indexCarousel])

    const scrollToImage = (direction) => {
        if (direction == 'prev') {
            setIndexCarousel(prevIndex => prevIndex === 0 ? props.otherImages.length : prevIndex - 1)
        } else if (direction == 'next') {
            setIndexCarousel(prevIndex => prevIndex === props.otherImages.length ? 0 : prevIndex + 1)
        } else {
            setIndexCarousel(direction)
        }
    }


    return (
        <div className='propertyImagesCarouselMobile'>
            <div className='carousel'>
                <div className='leftArrow' onClick={() => scrollToImage('prev')}></div>
                <div className='rightArrow' onClick={() => scrollToImage('next')}></div>
                <div className='carouselImages'>
                    <ul ref={carouselRef}>
                        <li><img className='mainImage' src={props.mainImage} alt="" /></li>
                        {props.otherImages.map((img, i) => {
                            return <li key={i}>
                                {img}
                            </li>
                        })}
                    </ul>
                </div>
                <div className='pageIndex'>
                    <p>{indexCarousel + 1} / {props.otherImages.length + 1}</p>
                </div>
                {/* <div className='carouselDots'>
                    <div className={`dot ${indexCarousel === 0 ? 'active' : ''}`} onClick={() => scrollToImage(0)}></div>
                    {props.otherImages.map((img, i) => {
                        return <div key={i} className={`dot ${indexCarousel === i + 1 ? 'active' : ''}`} onClick={() => scrollToImage(i+1)}></div>
                    })}
                </div> */}
            </div>
        </div>
    )
}

export default Carousel