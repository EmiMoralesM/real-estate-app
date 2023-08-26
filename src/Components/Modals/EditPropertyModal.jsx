import React, { useContext, useState } from 'react'
import { Context } from '../../assets/Context'
import axios from 'axios'

function EditPropertyModal(props) {
    const { SERVER_URL, useOutsideClick, hometypes_array, enableScroll, imageUrl, changeSuccessMessage, changeErrorMessage } = useContext(Context)

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
    const [otherImageError, setOtherImageError] = useState('')

    const refHomeType = useOutsideClick(() => setHomeTypeOpen(false))
    const refSizeScale = useOutsideClick(() => setSizeScaleOpen(false))

    const [homeTypeOpen, setHomeTypeOpen] = useState(false)
    const [sizeScaleOpen, setSizeScaleOpen] = useState(false)

    const [mainImagePreview, setMainImagePreview] = useState()
    const [otherImagesPreview, setOtherImagesPreview] = useState(props.editProperty.otherImages)

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
        if (input == 'all' || input == 'otherImages') {
            if (otherImages.length <= 0) {
                var valid = false
                setOtherImageError('Provide at least one other image')
            } else { setOtherImageError('') }
        }
        return valid
    }

    const handleUpdate = async () => {
        setLoading(true)
        if (checkInputs('all')) {
            let mainImageName = mainImage
            let otherImagesName = otherImages

            try {
                // If the Main image was changes upload the new one
                if (props.editProperty.mainImage != mainImage) {
                    const mainImg = new FormData()
                    mainImg.append('newMainImg', mainImage)
                    await axios.post(`${SERVER_URL}/postPropertyMainImage`, mainImg)
                        .then(async res => {
                            mainImageName = res.data
                        })
                }

                // If the Other images were changed upload the new ones
                if (props.editProperty.otherImages != otherImages) {
                    const otherImgs = new FormData();
                    otherImages.forEach(image => {
                        if (typeof image === 'string') {
                            otherImgs.append('oldOtherImages', image);
                        } else {
                            otherImgs.append('newOtherImages', image);
                        }
                    });
                    await axios.post(`${SERVER_URL}/postPropertyOtherImages`, otherImgs)
                        .then(async res => {
                            otherImagesName = res.data
                        })
                }

                // Property Post
                await axios.patch(`${SERVER_URL}/updateProperty/${props.editProperty._id}`, {
                    statusText: homeType,
                    price: price,
                    pricePerSqFt: (sizeScale.toLowerCase() == 'sqft' ? (price / size) : (price / (size * 43560))).toFixed(1),
                    lotSize: size,
                    lotAreaUnit: sizeScale.toLowerCase(),
                    beds: beds,
                    baths: baths,
                    mainImage: mainImageName,
                    otherImages: otherImagesName,
                })
                    .then(async newData => {
                        props.setResults(prevResults => prevResults.map(prop => {
                            if (prop._id == newData.data._id) {
                                return newData.data
                            } else {
                                return prop
                            }
                        }))
                        changeSuccessMessage('Property Updated!')
                        props.setEditProperty(false)
                        enableScroll()
                    })
            } catch (e) {
                changeErrorMessage('An error occured. Please try again later')
                props.setEditProperty(false)
            }
        } else {
            changeErrorMessage('Verify that every filed is filled')
        }
        setLoading(false)
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
                                    <label htmlFor="mainImage" className={`picturesLabel`}>
                                        <div>
                                            <span></span>
                                            <p>Select the main image for your product</p>
                                        </div>
                                        <p>Change Image</p>
                                    </label>
                                    <figure>
                                        {!mainImagePreview && <img src={imageUrl(mainImage)} alt="Main Image" />}
                                        {mainImagePreview && <img src={mainImagePreview} alt="Main Image" />}
                                    </figure>
                                </div>
                                <input
                                    type="file"
                                    name=""
                                    onChange={async (e) => previewImage(e, 'main')}
                                    id="mainImage"
                                    accept="image/png, image/jpeg"
                                    className='pictureInput'
                                />
                            </div>
                            <div>
                                <p>Other Images <span className='requiredField'>*</span></p>
                                <div className='imageContainer'>
                                    <label htmlFor="otherImages" className={`picturesLabel ${otherImageError ? 'errorInput' : ''} ${otherImages.length > 0 ? 'picturesLabelShrink' : ''}`}>
                                        <div>
                                            <span></span>
                                            <p>Select other images for your product</p>
                                        </div>
                                        <p>Add Images</p>
                                    </label>

                                    {(otherImages.length > 0 || otherImagesPreview.length > 0) && <figure className='otherImagesFigure'>
                                        {otherImagesPreview.length > 0 && otherImagesPreview.map((image, i) => (
                                            <div key={i}>
                                                {/* If its an old image it will display it normally. */}
                                                {otherImages.includes(image) && <img src={imageUrl(image)} alt="" />}
                                                {/* If its a new uploaded image it will display it in the base64 format. */}
                                                {!otherImages.includes(image) && <img src={image} alt="" />}
                                                <span
                                                    className='removeImage'
                                                    onClick={() => {
                                                        setOtherImagesPreview(prevOtherImage => prevOtherImage.filter(item => image != item))
                                                        setOtherImages(otherImage => otherImage.filter(item => otherImage[i] != item))
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
                    </div >

                    <div className='deleteUserEditActions'>
                        <button onClick={() => {
                            props.setEditProperty(false)
                            enableScroll()
                        }} className='cancel'>Cancel</button>

                        {!loading && <button className='button' onClick={handleUpdate}>Update</button>}
                        {loading && <button className='button buttonLoading'><span className="loader"></span></button>}
                    </div>
                </div>



            </div>
            <div onClick={() => {
                props.setEditProperty(false)
                enableScroll()
            }} className='generalModalBackground'></div>
        </aside >
    )
}

export default EditPropertyModal