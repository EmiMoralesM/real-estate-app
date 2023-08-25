import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import time from '../../assets/icons/time.svg'
import eyes from '../../assets/icons/eyes.svg'
import saveMoney from '../../assets/icons/save-money.svg'
import { Context } from '../../assets/Context'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function MainPage(props) {
    const { useOutsideClick, user, changeErrorMessage } = useContext(Context)

    const stateOptions = { "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"};
    
    const [isStateOpen, setIsStateOpen] = useState(false);
    const [fieldError, setFieldError] = useState('')
    
    const navigate = useNavigate();
    
    const checkAddress = () => {
        if (!props.addressStreet) {
            setFieldError('street');
            changeErrorMessage('Please enter a valid street');
            return false;
        }
        if (!props.addressCity) {
            setFieldError('city');
            changeErrorMessage('Please enter a valid city');
            return false;
        }
        if (!props.addressState) {
            setFieldError('state');
            changeErrorMessage('Please enter a valid state');
            return false;
        }
        if (!props.addressZipCode || (props.addressZipCode.length !== 5 && props.addressZipCode.length !== 9)) {
            setFieldError('zip');
            changeErrorMessage('Please enter a valid zip code');
            return false;
        }
        return true
    }

    const handleAddressSubmit = async () => {
        if (user.email) {
            if (checkAddress()) {
                try {
                    const results = await geocodeByAddress(`${props.addressStreet}, ${props.addressCity}, ${props.addressState}, ${props.addressZipCode}`)
                    const coord = await getLatLng(results[0])
                    await props.setCoordinates(coord);
                    navigate('/sellProperty/propertyInformation/mapAddress');
                } catch (e) {
                    changeErrorMessage('The address entered does not exist. Please enter a valid address')
                }
            }
        } else {
            changeErrorMessage('You have to sign in to sell a property')
        }
    }

    const refState = useOutsideClick(() => setIsStateOpen(false))

    return (
        <>
            <section className='bannerSellProp'>
                <h1>The Best Way to Sell Your Home</h1>
                <div>
                    <div className='sellPropeSearchBarDiv'>
                        <div>
                            <div className={`streetDiv ${props.addressStreet ? 'optionSelected' : ''} ${fieldError == 'street' ? 'fieldError' : ''}`}>
                                <label htmlFor="street">STREET</label>
                                <input
                                    type="text"
                                    name='street'
                                    value={props.addressStreet}
                                    onChange={(event) => props.setAddressStreet(event.target.value)}
                                    onClick={() => {
                                        if (fieldError == 'street') { setFieldError() }
                                    }}
                                    placeholder="Street address..."
                                />
                            </div>
                            <div className={`cityDiv ${props.addressCity ? 'optionSelected' : ''} ${fieldError == 'city' ? 'fieldError' : ''}`} >
                                <label htmlFor="city">CITY</label>
                                <input
                                    type="text"
                                    name='city'
                                    value={props.addressCity}
                                    onChange={(event) => props.setAddressCity(event.target.value)}
                                    onClick={() => {
                                        if (fieldError == 'city') { setFieldError() }
                                    }}
                                    placeholder="City..."
                                />
                            </div>
                            <div className='stateDiv'>
                                <label>STATE</label>
                                <div
                                    onClick={() => setIsStateOpen(prevIsStateOpen => !prevIsStateOpen)} ref={refState}
                                    className={`dropdown ${isStateOpen ? 'openDropdown' : ''} ${props.addressState ? 'optionSelected' : ''} ${fieldError == 'state' ? 'fieldError' : ''}`}
                                >
                                    <input type="text" name='state' placeholder='State...' value={props.addressState} readOnly />
                                    {isStateOpen && (
                                        <div className="options">
                                            {Object.keys(stateOptions).map((fullName) => (
                                                props.addressState !== stateOptions[fullName] ? (
                                                    <div
                                                        className="option-item"
                                                        key={fullName}
                                                        onClick={() => {
                                                            props.setAddressState(stateOptions[fullName]);
                                                            if (fieldError === 'state') {
                                                                setFieldError();
                                                            }
                                                        }}
                                                    >
                                                        {fullName}
                                                    </div>
                                                ) : null
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={`zipDiv ${props.addressZipCode ? 'optionSelected' : ''} ${fieldError == 'zip' ? 'fieldError' : ''}`}>
                                <label htmlFor="zip">ZIP</label>
                                <input
                                    type="number"
                                    name='zip'
                                    value={props.addressZipCode}
                                    onChange={(event) => props.setAddressZipCode(event.target.value)}
                                    onClick={() => {
                                        if (fieldError == 'zip') { setFieldError() }
                                    }}
                                    placeholder="Zip..."
                                />
                            </div>
                            <div className='searchSubmitDiv'>
                                <Link className='searchButton' onClick={handleAddressSubmit} />
                            </div>
                        </div>
                    </div>
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
                    {/* <div className='sellNowButtonDiv'>
                        <button className='sellNowButton' onClick={() => window.scrollTo(0, 0)}>Sell Now</button>
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default MainPage