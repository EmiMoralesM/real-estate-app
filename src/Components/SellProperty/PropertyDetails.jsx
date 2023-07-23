import React, { useContext, useState } from 'react'
import { Context } from '../../assets/Context'

function PropertyDetails() {
    const { useOutsideClick } = useContext(Context)
    let address = '5145 S Hatch Drive, Evergreen, CO 80439'
    const hometypes_array = ['Houses', 'Townhomes', 'Multy-family', 'Condos', 'Aparments']

    const [homeType, setHomeType] = useState(hometypes_array[0])
    const [homeTypeOpen, setHomeTypeOpen] = useState(false)

    const [beds, setBeds] = useState(0)
    const [baths, setBaths] = useState(0)
    const [size, setSize] = useState(0)
    const [sizeScale, setSizeScale] = useState('Sqft')
    const [sizeScaleOpen, setSizeScaleOpen] = useState(false)

    const refHomeType = useOutsideClick(() => setHomeTypeOpen(false))
    const refSizeScale = useOutsideClick(() => setSizeScaleOpen(false))

    return (
        <>
            <form action="#" className='propDetailsForm'>
                <div className='propPriceDiv'>
                    <p className='propDetailsTitle'>Price</p>
                    <div>
                        <span>$</span>
                        <input type="number" />
                    </div>
                    <hr />
                </div>
                {/* <div>
                    <p className='propDetailsTitle'>Pictures</p>
                    <div>
                        <label htmlFor="">Main Image</label>
                        <input type="file" name="" id="" accept="image/png, image/jpeg" />
                    </div>
                    <div>
                        <label htmlFor="">Other Images</label>
                        <input type="file" name="" id="" accept="image/png, image/jpeg" />
                    </div>
                </div> */}
                <div className='propInfoDiv'>
                    <p className='propInfoTitle'>Home Details</p>
                    <div className='propInfoHomeType' ref={homeTypeOpen ? refHomeType : null}>
                        <label htmlFor="homeType">Home Type</label>
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
                        <label htmlFor="beds">Beds</label>
                        <input type="number" name="beds" id="beds" value={beds} max="99" onChange={(e) => setBeds(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="baths">Baths</label>
                        <input type="number" name="baths" id="baths" value={baths} max="99" onChange={(e) => setBaths(e.target.value)} />
                    </div>
                    <div className='propInfoSqftDiv'>
                        <div>
                            <label htmlFor="size">Lot Size</label>
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
                </div>

            </form>
        </>
    )
}

export default PropertyDetails