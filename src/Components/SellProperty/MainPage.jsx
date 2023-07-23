import React from 'react'
import { Link } from 'react-router-dom'

import eyes from '../../assets/icons/eyes.svg'
import saveMoney from '../../assets/icons/save-money.svg'

function MainPage() {
    return (
        <>
            <section className='bannerSellProp'>
                <h1>The Best Way to Sell Your Home</h1>
                <div>
                    <div className='sellPropeSearchBarDiv'>
                        <input type="text" placeholder='Enter address...' name="" id="" />
                        <span><Link to={'/sellProperty/propertyInformation/mapAddress'}></Link></span>
                    </div>
                    <p>Or manually <Link>select your address</Link> on the map</p>
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
                            <img src={eyes} alt="" />
                            <h3>More eyes on your home</h3>
                            <p>When you list with Zillow, you are exposed to thousands of possible buyers, increasing the chances you’ll sell your home.</p>
                        </div>
                        <div>
                            <img src={eyes} alt="" />
                            <h3>More eyes on your home</h3>
                            <p>When you list with Zillow, you are exposed to thousands of possible buyers, increasing the chances you’ll sell your home.</p>
                        </div>
                        <div>
                            <img src={saveMoney} alt="" />
                            <h3>Save with our 1% listing fee</h3>
                            <p>When you buy and sell with us, you’ll pay a listing fee that’s less than half of what brokerages commonly charge.</p>
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