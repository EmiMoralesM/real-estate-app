import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../assets/Context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function PropertyDetails(props) {
    const { SERVER_URL, useOutsideClick, user, setUser, hometypes_array, changeSuccessMessage, changeErrorMessage } = useContext(Context)
    const navigate = useNavigate();

    const [price, setPrice] = useState('')
    const [homeType, setHomeType] = useState(hometypes_array[0])
    const [beds, setBeds] = useState(0)
    const [baths, setBaths] = useState(0)
    const [size, setSize] = useState(0)
    const [sizeScale, setSizeScale] = useState('Sqft')
    const [mainImage, setMainImage] = useState('')
    const [otherImages, setOtherImages] = useState([])

    const [priceError, setPriceError] = useState('')
    const [sizeError, setSizeError] = useState('')
    const [mainImageError, setMainImageError] = useState('')
    const [otherImageError, setOtherImageError] = useState('')


    const refHomeType = useOutsideClick(() => setHomeTypeOpen(false))
    const refSizeScale = useOutsideClick(() => setSizeScaleOpen(false))

    const [homeTypeOpen, setHomeTypeOpen] = useState(false)
    const [sizeScaleOpen, setSizeScaleOpen] = useState(false)

    const [mainImagePreview, setMainImagePreview] = useState('')
    const [otherImagesPreview, setOtherImagesPreview] = useState([])

    const [loading, setLoading] = useState(false)

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
                const file = e.target.files[x];
                // If the file has already been uploaded, we dont allow the image to be uploaded
                if (!otherImages.some((existingFile) => existingFile.name + existingFile.type === file.name + file.type)) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => {
                        setOtherImagesPreview(prevOtherImage => [...prevOtherImage, reader.result])
                        setOtherImages(prevOtherImage => [...prevOtherImage, file])
                    }
                } else {
                    changeErrorMessage('You already uploaded this file')
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

    const handleSubmit = async () => {
        setLoading(true)
        if (checkInputs('all')) {
            let mainImageName, otherImagesName
            try {
                // Main image upload
                const mainImg = new FormData()
                mainImg.append('newMainImg', mainImage)
                await axios.post(`${SERVER_URL}/postPropertyMainImage`, mainImg)
                    .then(async res => {
                        mainImageName = res.data
                    })

                // Other images upload
                const otherImgs = new FormData();
                otherImages.forEach(image => {
                    otherImgs.append('newOtherImages', image);
                });

                await axios.post(`${SERVER_URL}/postPropertyOtherImages`, otherImgs)
                    .then(async res => {
                        otherImagesName = res.data
                    })

                // Property Post
                await axios.post(`${SERVER_URL}/postProperty`, {
                    statusType: 'FOR_SALE',
                    statusText: homeType,
                    price: price,
                    pricePerSqFt: (sizeScale.toLowerCase() == 'sqft' ? (price / size) : (price / (size * 43560))).toFixed(1),
                    lotSize: size,
                    lotAreaUnit: sizeScale.toLowerCase(),
                    beds: beds,
                    baths: baths,
                    address: `${props.addressStreet}, ${props.addressCity}, ${props.addressState} ${props.addressZipCode}`,
                    addressStreet: props.addressStreet,
                    addressCity: props.addressCity,
                    addressState: props.addressState,
                    addressZipcode: props.addressZipCode,
                    coordinates: {
                        lat: props.coordinates.lat,
                        lng: props.coordinates.lng,
                    },
                    mainImage: mainImageName,
                    otherImages: otherImagesName,
                    ownerId: user._id
                })
                    .then(async data => {
                        // Update user (yourProperties)
                        await axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { yourProperties: [...user.yourProperties, data.data._id] })
                            .then(resUser => {
                                setUser(resUser.data)
                            })
                        // Navigate to the uploaded property 
                        navigate(`../../properties/details/${data.data.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${data.data._id}`)
                    })
            } catch (e) {
                changeErrorMessage('An error occured. Please try again later')
            }
        } else {
            window.scrollTo(0, 0)
        }
        setLoading(false)
    }



    /*  const handleSubmit = async (e) => {
         setLoading(true)
         if (checkInputs('all')) {
             await axios.post(`${SERVER_URL}/postProperty`, {
                 statusType: 'FOR_SALE',
                 statusText: homeType,
                 price: price,
                 pricePerSqFt: (sizeScale.toLowerCase() == 'sqft' ? (price / size) : (price / (size * 43560))).toFixed(1),
                 lotSize: size,
                 lotAreaUnit: sizeScale.toLowerCase(),
                 beds: beds,
                 baths: baths,
                 address: `${props.addressStreet}, ${props.addressCity}, ${props.addressState} ${props.addressZipCode}`,
                 addressStreet: props.addressStreet,
                 addressCity: props.addressCity,
                 addressState: props.addressState,
                 addressZipcode: props.addressZipCode,
                 coordinates: {
                     lat: props.coordinates.lat,
                     lng: props.coordinates.lng,
                 },
                 ownerId: user._id
             })
                 .then(async data => {
                     const mainImg = new FormData()
                     mainImg.append('newMainImg', mainImage)
                     await axios.patch(`${SERVER_URL}/postPropertyMainImage/${data.data._id}`, mainImg)
                         .then(async res => {
                             console.log('main img');
                             console.log(res);
                             const otherImgs = new FormData();
                             otherImages.forEach(image => {
                                 otherImgs.append('newOtherImages', image);
                             });
                             await axios.patch(`${SERVER_URL}/postPropertyOtherImages/${data.data._id}`, otherImgs)
                                 .then(async res => {
                                     console.log('other imgs');
                                     console.log(res);
                                     await axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { yourProperties: [...user.yourProperties, data.data._id] })
                                         .then(resUser => {
                                             setUser(resUser.data)
                                             navigate(`../../properties/details/${res.data.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${res.data._id}`)
                                         })
                                 })
                         })
     
                 })
             // props.setPropertyId('64bf54767ddbcab441138187')
     
         } else {
             window.scrollTo(0, 0)
         }
         setLoading(false)
     } */

    return (
        <>
            <div className='propDetailsForm'>
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
                        }} id="mainImage" accept="image/jpeg, image/png" className='pictureInput' />
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
                                    <div key={i}>
                                        <img src={image} alt="" />
                                        <span
                                            className='removeImage'
                                            onClick={() => {
                                                setOtherImages(prevOtherImage => prevOtherImage.filter(item => otherImages[i] != item))
                                                setOtherImagesPreview(prevOtherImage => prevOtherImage.filter(item => image != item))
                                            }}
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
                        <input type="tel" id="phone" name="phone" />
                    </div>
                    <hr />
                </div>
                {!loading && <button className='button submitSellPorpertyButton' onClick={handleSubmit}>Submit</button>}
                {loading && <button className='button submitSellPorpertyButton submitSellPorpertyButtonLoading' onClick={handleSubmit}><span className="loader"></span></button>}
            </div >
        </>
    )
}

export default PropertyDetails