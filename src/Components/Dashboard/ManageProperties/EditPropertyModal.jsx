import React, { useContext, useState } from 'react'
import { Context } from '../../../assets/Context'
import axios from 'axios'

function EditPropertyModal(props) {
    const { SERVER_URL, useOutsideClick, user, setUser, hometypes_array, enableScroll } = useContext(Context)


    const [price, setPrice] = useState(props.editProperty.price)
    const [homeType, setHomeType] = useState(props.editProperty.statusText)
    const [beds, setBeds] = useState(props.editProperty.beds)
    const [baths, setBaths] = useState(props.editProperty.baths)
    const [size, setSize] = useState(props.editProperty.lotSize)
    const [sizeScale, setSizeScale] = useState(props.editProperty.lotAreaUnit)
    const [mainImage, setMainImage] = useState(props.editProperty.mainImage)
    const [otherImages, setOtherImages] = useState(props.editProperty.otherImages)

    const [priceError, setPriceError] = useState('')
    const [sizeError, setSizeError] = useState('')
    const [mainImageError, setMainImageError] = useState('')
    const [otherImageError, setOtherImageError] = useState('')

    console.log(mainImage);
    const refHomeType = useOutsideClick(() => setHomeTypeOpen(false))
    const refSizeScale = useOutsideClick(() => setSizeScaleOpen(false))

    const [homeTypeOpen, setHomeTypeOpen] = useState(false)
    const [sizeScaleOpen, setSizeScaleOpen] = useState(false)

    const [mainImagePreview, setMainImagePreview] = useState(props.editProperty.mainImage)
    const [otherImagesPreview, setOtherImagesPreview] = useState(props.editProperty.otherImages)

    const [submitActive, setSubmitActive] = useState(false)

    const previewImage = (e, type) => {
        const reader = new FileReader()
        if (type == 'main') {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setMainImagePreview(reader.result)
                setMainImage(e.target.files[0])
            }
        } else if (type == 'other') {
            for (let x = 0; x < e.target.files.length; x++) {
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[x])
                reader.onload = () => {
                    setOtherImagesPreview(prevOtherImage => [...prevOtherImage, reader.result])
                    setOtherImages(prevOtherImage => [...prevOtherImage, e.target.files[x]])
                }
            }
        }
    }

    const checkInputs = (input) => {
        var valid = true
        if (input == 'all' || input == 'price') {
            if (price <= 0) {
                var valid = false
                setPriceError('Enter a valid price')
            } else { setPriceError('') }
        }
        if (input == 'all' || input == 'size') {
            if (size <= 0) {
                var valid = false
                setSizeError('Enter a valid lot size')
            } else { setSizeError('') }
        }
        if (input == 'all' || input == 'mainImage') {
            if (!mainImage) {
                var valid = false
                setMainImageError('Provide a main image for the property')
            } else { setMainImageError('') }
        }
        if (input == 'all' || input == 'otherImages') {
            if (otherImages.length <= 0) {
                var valid = false
                setOtherImageError('Provide at least one other image')
            } else { setOtherImageError('') }
        }
        return valid
    }

    const handleUpdate = async (e) => {
        setSubmitActive(true)
        if (checkInputs('all')) {
            console.log('update property...');
            await axios.post(`${SERVER_URL}/updateProperty/${props.editProperty._id}`, {
                statusText: homeType,
                price: price,
                pricePerSqFt: (sizeScale.toLowerCase() == 'sqft' ? (price / size) : (price / (size * 43560))).toFixed(1),
                lotSize: size,
                lotAreaUnit: sizeScale.toLowerCase(),
                beds: beds,
                baths: baths,
            })
                .then(data => {
                    props.changeSuccessMessage('Property Updated!')
                    props.setEditProperty(false)
                    enableScroll()
                    // if(props.editProperty.mainImage != mainImage){

                    // }
                    // const imagesData = new FormData()
                    // imagesData.append('imagesData', mainImage)
                    // otherImages.forEach(image => {
                    //     imagesData.append('imagesData', image)
                    // });
                    // axios.patch(`${SERVER_URL}/postPropertyImages/${props.editProperty._id}`, imagesData)
                    //     .then(res => {
                    //         props.changeSuccessMessage('Property Updated!')
                    //         props.setEditProperty(false)
                    //         enableScroll()
                    //     })
                })

        } else {
            setSubmitActive(false)
            window.scrollTo(0, 0)
        }
    }
    return (
        <aside className='generalModal'>
            <div className='editPropertyModalDiv'>
                <button className='closeModal' onClick={() => {
                    enableScroll()
                    props.setEditProperty(false)
                }}></button>
                <div className='generalModalContent'>
                    <h3>Edit property</h3>

                    <div className='propDetailsForm editPropertyForm'>
                        <div className='propPriceDiv'>
                            <h2 className='propInfoTitle'>Price <span className='requiredField'>*</span></h2>
                            <div>
                                <span>$</span>
                                <input
                                    type="number"
                                    onBlur={() => checkInputs('price')}
                                    className={priceError ? 'errorInput' : ''}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                {priceError && <p className='errorText errorPropertyDetails'>{priceError}</p>}
                            </div>
                            <hr />
                        </div>
                        <div>
                            <h2 className='propInfoTitle'>Pictures</h2>
                            <div>
                                <p>Main Image <span className='requiredField'>*</span></p>
                                <div className='imageContainer' >
                                    <label
                                        htmlFor="mainImage"
                                        className={`picturesLabel ${mainImageError ? 'errorInput' : ''}`}
                                    >
                                        <div>
                                            <span></span>
                                            <p>Select the main image for your product</p>
                                        </div>
                                        {!mainImagePreview && <p>Add Image</p>}
                                        {mainImagePreview && <p>Change Image</p>}
                                    </label>
                                    {mainImagePreview && <figure>
                                        <img src={mainImagePreview} alt="Main Image" />
                                    </figure>}
                                    {mainImageError && <p className='errorText errorPropertyDetails'>{mainImageError}</p>}
                                </div>
                                <input type="file" name="" onChange={async (e) => {
                                    previewImage(e, 'main')
                                    setMainImageError('')
                                }} id="mainImage" accept="image/png, image/jpeg" className='pictureInput' />
                            </div>
                            <div>
                                <p>Other Images <span className='requiredField'>*</span></p>
                                <div className='imageContainer'>
                                    <label htmlFor="otherImages" className={`picturesLabel ${otherImageError ? 'errorInput' : ''} ${otherImagesPreview.length > 0 ? 'picturesLabelShrink' : ''}`}>
                                        <div>
                                            <span></span>
                                            <p>Select other images for your product</p>
                                        </div>
                                        <p>Add Images</p>
                                    </label>
                                    {otherImagesPreview.length > 0 && <figure className='otherImagesFigure'>
                                        {otherImagesPreview.map((image, i) => (
                                            <div>
                                                <img src={image} key={i} alt="" />
                                                <span
                                                    className='removeImage'
                                                    onClick={() => setOtherImagesPreview(prevOtherImage => prevOtherImage.filter(item => image != item))}
                                                ></span>
                                            </div>
                                        ))}
                                    </figure>}
                                    {otherImageError && <p className='errorText errorPropertyDetails'>{otherImageError}</p>}
                                </div>
                                <input type="file" name="" multiple onChange={(e) => {
                                    previewImage(e, 'other')
                                    setOtherImageError('')
                                }} id="otherImages" accept="image/png, image/jpeg" className='pictureInput' />
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
                                    <input
                                        type="number"
                                        onBlur={() => checkInputs('size')}
                                        className={sizeError ? 'errorInput' : ''}
                                        name="size"
                                        id="size"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                    />
                                    {sizeError && <p className='errorText errorPropertyDetails'>{sizeError}</p>}

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
                    </div >





                    <div className='deleteUserEditActions'>
                        <button onClick={() => {
                            props.setEditProperty(false)
                            enableScroll()
                        }} className='cancel'>Cancel</button>
                        <button className='button' onClick={handleUpdate}>Update</button>
                    </div>
                </div>



            </div>
            <div onClick={() => {
                props.setEditProperty(false)
                enableScroll()
            }} className='generalModalBackground'></div>
        </aside>
    )
}

export default EditPropertyModal