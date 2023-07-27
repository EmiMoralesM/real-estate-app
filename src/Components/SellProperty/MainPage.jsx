import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import time from '../../assets/icons/time.svg'
import eyes from '../../assets/icons/eyes.svg'
import saveMoney from '../../assets/icons/save-money.svg'
import { Context } from '../../assets/Context'

function MainPage(props) {
    const { useOutsideClick } = useContext(Context)

    const [isStateOpen, setIsStateOpen] = useState(false);
    const stateOptions = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

    const handleAddressSubmit = () => {
        location = '/sellProperty/propertyInformation/mapAddress'
    }

    const refState = useOutsideClick(() => setIsStateOpen(false))

    return (
        <>
            <section className='bannerSellProp'>
                <h1>The Best Way to Sell Your Home</h1>
                <div>
                    <div className='sellPropeSearchBarDiv'>
                        <div>
                            <div className={`streetDiv ${props.addressStreet ? 'optionSelected' : ''}`}>
                                <label htmlFor="street">Street</label>
                                <input
                                    type="text"
                                    name='street'
                                    value={props.addressStreet}
                                    onChange={(event) => props.setAddressStreet(event.target.value)}
                                    placeholder="Street address..."
                                />
                            </div>
                            <div className={`cityDiv ${props.addressCity ? 'optionSelected' : ''}`}>
                                <label htmlFor="city">CITY</label>
                                <input
                                    type="text"
                                    name='city'
                                    value={props.addressCity}
                                    onChange={(event) => props.setAddressCity(event.target.value)}
                                    placeholder="City..."
                                />
                            </div>
                            <div className='stateDiv'>
                                <label>STATE</label>
                                <div
                                    onClick={() => setIsStateOpen(prevIsStateOpen => !prevIsStateOpen)} ref={refState}
                                    className={`dropdown ${isStateOpen ? 'openDropdown' : ''} ${props.addressState ? 'optionSelected' : ''}`}
                                >
                                    <input type="text" name='state' placeholder='State...' value={props.addressState} readOnly />
                                    {isStateOpen && (
                                        <div className="options">
                                            {stateOptions.map((option) => (
                                                props.addressState != option ? <div
                                                    className="option-item"
                                                    key={option}
                                                    onClick={() => props.setAddressState(option)}
                                                >
                                                    {option}
                                                </div> : ''
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={`zipDiv ${props.addressZipCode ? 'optionSelected' : ''}`}>
                                <label htmlFor="zip">ZIP</label>
                                <input
                                    type="text"
                                    name='zip'
                                    value={props.addressZipCode}
                                    onChange={(event) => props.setAddressZipCode(event.target.value)}
                                    placeholder="Zip..."
                                />
                            </div>
                            <div className='searchSubmitDiv'>
                                <button className='searchButton' onClick={handleAddressSubmit} type="submit"></button>
                            </div>
                        </div>
                    </div>
                    {/* <p>Or manually <Link>select your address</Link> on the map</p> */}
                </div>
            </section>
            <section className='contentSellProp'>
                <div className='whySellSection'>
                    <div className='propertiesTitleDiv'>
                        <p>SELL PROPERTY</p>
                        <h2>Why Sell with Zillow?</h2>
                    </div>
                    <div className='whySellDiv'>
                        <div>
                            <img src={time} alt="" />
                            <h3>Real-Time Updates</h3>
                            <p>Stay informed with real-time notifications. Track views, inquiries, and feedback for a successful sale.</p>
                        </div>
                        <div>
                            <img src={eyes} alt="" />
                            <h3>More eyes on your home</h3>
                            <p>When you list with us, you are exposed to thousands of possible buyers, increasing the chances you’ll sell your home.</p>
                        </div>
                        <div>
                            <img src={saveMoney} alt="" />
                            <h3>Save with our 1% listing fee</h3>
                            <p>When you sell with us, you’ll pay a listing fee that’s less than half of what brokerages commonly charge.</p>
                        </div>
                    </div>
                    <div className='sellNowButtonDiv'>
                        <button className='sellNowButton'>Sell Now</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainPage