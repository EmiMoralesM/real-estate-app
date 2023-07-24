import React, { useContext, useState } from 'react'
import { Context } from '../../assets/Context'
import test from '../../assets/imgs/banner.jpg'

function PropertyDetails() {
    const { useOutsideClick } = useContext(Context)
    let address = '5145 S Hatch Drive, Evergreen, CO 80439'
    const hometypes_array = ['Houses', 'Townhomes', 'Multy-family', 'Condos', 'Aparments']

    
    const [homeType, setHomeType] = useState(hometypes_array[0])
    const [beds, setBeds] = useState(0)
    const [baths, setBaths] = useState(0)
    const [size, setSize] = useState(0)
    const [sizeScale, setSizeScale] = useState('Sqft')
    

    const refHomeType = useOutsideClick(() => setHomeTypeOpen(false))
    const refSizeScale = useOutsideClick(() => setSizeScaleOpen(false))
    
    const [homeTypeOpen, setHomeTypeOpen] = useState(false)
    const [sizeScaleOpen, setSizeScaleOpen] = useState(false)

    const [mainImagePreview, setMainImagePreview] = useState('')
    const [otherImagePreview, setOtherImagePreview] = useState([])



    const previewImage = (e, type) => {
        const reader = new FileReader()
        if (type == 'main') {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setMainImagePreview(reader.result)
            }
        } else if (type == 'other') {
            if (e.target.files.length == 1) {
                console.log('one image');
                reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    setOtherImagePreview(prevOtherImagePreview => [...prevOtherImagePreview, reader.result])
                }
            } else if (e.target.files.length > 1) {
                for (let x = 0; x < e.target.files.length; x++) {
                    const reader = new FileReader()
                    reader.readAsDataURL(e.target.files[x])
                    reader.onload = () => {
                        setOtherImagePreview(prevOtherImagePreview => [...prevOtherImagePreview, reader.result])
                    }
                }
            }
        }
    }

    return (
        <>
            <form action="#" className='propDetailsForm'>
                <div className='propPriceDiv'>
                    <h2 className='propInfoTitle'>Price <span className='requiredField'>*</span></h2>
                    <div>
                        <span>$</span>
                        <input type="number" />
                    </div>
                    <hr />
                </div>
                <div>
                    <h2 className='propInfoTitle'>Pictures</h2>
                    <div>
                        <p>Main Image <span className='requiredField'>*</span></p>
                        <div className='imageContainer'>
                            <label htmlFor="mainImage" className='picturesLabel' >
                                <div>
                                    <span></span>
                                    <p>Select the main image for your product</p>
                                </div>
                                {!mainImagePreview && <p>Add Image</p>}
                                {mainImagePreview && <p>Change Image</p>}
                            </label>
                            {mainImagePreview && <figure>
                                <img src={mainImagePreview} id='mainImagePreview' alt="" />
                            </figure>}
                        </div>
                        <input type="file" name="" onChange={(e) => previewImage(e, 'main')} id="mainImage" accept="image/png, image/jpeg" className='pictureInput' />
                    </div>
                    <div>
                        <p>Other Images <span className='requiredField'>*</span></p>
                        <div className='imageContainer'>
                            <label htmlFor="otherImages" className={`picturesLabel ${otherImagePreview.length > 0 ? 'picturesLabelShrink' : ''}`}>
                                <div>
                                    <span></span>
                                    <p>Select other images for your product</p>
                                </div>
                                <p>Add Images</p>
                            </label>
                            {otherImagePreview.length > 0 && <figure className='otherImagesFigure'>
                                {otherImagePreview.map((image, i) => (
                                    <div>
                                        <img src={image} key={i} alt="" />
                                        <span
                                            className='removeImage'
                                            onClick={() => setOtherImagePreview(prevOtherImagePreview => prevOtherImagePreview.filter(item => image != item))}
                                        ></span>
                                    </div>
                                ))}
                            </figure>}
                        </div>
                        <input type="file" name="" multiple onChange={(e) => previewImage(e, 'other')} id="otherImages" accept="image/png, image/jpeg" className='pictureInput' />
                    </div>
                    <hr />
                </div>
                <div className='propInfoDiv'>
                    <h2 className='propInfoTitle'>Home Details</h2>
                    <div className='propInfoHomeType' ref={homeTypeOpen ? refHomeType : null}>
                        <label htmlFor="homeType">Home Type <span className='requiredField'>*</span></label>
                        <div className='homeTypeInputDiv' onClick={() => setHomeTypeOpen(prevMinPriceOpen => !prevMinPriceOpen)}>
                            <input type="text" name='homeType' id='homeType' value={homeType} readOnly />
                            <p className={`arrow ${homeTypeOpen ? 'arrowActive' : ''}`}></p>
                        </div>
                        {homeTypeOpen &&
                            <div className={'optionsDiv'} onClick={() => setHomeTypeOpen(false)} >
                                {/* Returns every option but the one selected: */}
                                {hometypes_array.map(option => (
                                    <>
                                        {homeType != option && <div
                                            className="option-item"
                                            key={option}
                                            onClick={() => setHomeType(option)}
                                        >{option}</div>}
                                    </>
                                ))}
                            </div>
                        }
                    </div>
                    <div>
                        <label htmlFor="beds">Bedrooms <span className='requiredField'>*</span></label>
                        <input type="number" name="beds" id="beds" value={beds} max="99" onChange={(e) => setBeds(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="baths">Baths <span className='requiredField'>*</span></label>
                        <input type="number" name="baths" id="baths" value={baths} max="99" onChange={(e) => setBaths(e.target.value)} />
                    </div>
                    <div className='prop50PercentDiv propInfoSqftDiv'>
                        <div>
                            <label htmlFor="size">Lot Size <span className='requiredField'>*</span></label>
                            <input type="number" name="size" id="size" value={size} max="99" onChange={(e) => setSize(e.target.value)} />
                        </div>
                        <div ref={sizeScaleOpen ? refSizeScale : null}>
                            <input type="text" name="sizeScale" readOnly id="sizeScale" value={sizeScale} onClick={() => setSizeScaleOpen(prevSizeScaleOpen => !prevSizeScaleOpen)} />
                            <p className={`arrow ${sizeScaleOpen ? 'arrowActive' : ''}`}></p>
                            {sizeScaleOpen &&
                                <div className={'optionsDiv'} onClick={() => setSizeScaleOpen(false)} >
                                    {sizeScale.toLowerCase() != 'sqft' && <div className="option-item" onClick={() => setSizeScale('Sqft')}>Sqft</div>}
                                    {sizeScale.toLowerCase() != 'acres' && <div className="option-item" onClick={() => setSizeScale('Acres')}>Acres</div>}
                                </div>
                            }
                        </div>
                    </div>
                    <hr />
                </div>
                <div className='propInfoDiv'>
                    <h2 className='propInfoTitle'>Aditional Information</h2>
                    <div className='prop50PercentDiv'>
                        <div>
                            <label htmlFor="size">Related Website</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="size">What I love about this home</label>
                            <textarea name="" id="" cols="30" rows="7"></textarea>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className='propInfoDiv'>
                    <h2 className='propInfoTitle'>Contact Information</h2>
                    <p>Potential buyers will contact you through the email address you use to register on Zillow. You can also add your phone number.</p>
                    <div>
                        <label htmlFor="size">Phone Number</label>
                        <input type="tel" id="phone" name="phone"/>
                    </div>
                    <hr />
                </div>
                <button className='button submitSellPorpertyButton'>Submit</button>
            </form >
        </>
    )
}

export default PropertyDetails