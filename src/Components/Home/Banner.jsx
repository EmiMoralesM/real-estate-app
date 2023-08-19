import React, { useContext, useState } from 'react'
import { Context } from '../../assets/Context';

function Banner() {
    const { hometypes_array } = useContext(Context)
    const [locationValue, setLocationValue] = useState('');

    const [isStateOpen, setIsStateOpen] = useState(false);
    const [selectedStateOption, setSelectedStateOption] = useState('Any');
    const stateOptions = ["Any", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [selectedTypeOption, setSelectedTypeOption] = useState('Any');

    const toggleDropdown = (id) => {
        if (id == "state") setIsStateOpen(prevIsStateOpen => !prevIsStateOpen);
        if (id == "type") setIsTypeOpen(prevIsTypeOpen => !prevIsTypeOpen);
    };


    return (
        <section className='bannerSection'>
            <div className='titleDiv'>
                {/* <h1> Discover a Place You'll Love to Live</h1> */}
                <h1> <span>Discover a <span>Place</span></span><span>You'll Love to Live</span> </h1>
                <hr />
                {/* <p>Changing how agents and clients navigate the process of finding or selling a home.</p> */}
            </div>
            <div className='searchBarDiv'>
                <form action="#">
                    <div className={`locationDiv ${locationValue ? 'optionSelected' : ''}`}>
                        <label htmlFor="location">LOCATION</label>
                        <input
                            type="text"
                            name='location'
                            value={locationValue}
                            onChange={(event) => setLocationValue(event.target.value)}
                            placeholder="Enter an address, neighborhood, city, or ZIP code"
                        />
                    </div>
                    <div className='stateDiv' onMouseLeave={() => setIsStateOpen(false)}>
                        <label>STATE</label>
                        <div
                            onClick={() => toggleDropdown('state')}
                            className={`dropdown ${isStateOpen ? 'openDropdown' : ''} ${selectedStateOption != 'Any' ? 'optionSelected' : ''}`}
                        >
                            <input type="text" name='state' value={selectedStateOption} readOnly />
                            {isStateOpen && (
                                <div className="options">
                                    {stateOptions.map((option) => (
                                        selectedStateOption != option ? <div
                                            className="option-item"
                                            key={option}
                                            onClick={() => setSelectedStateOption(option)}
                                        >
                                            {option}
                                        </div> : ''
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='typeDiv' onMouseLeave={() => setIsTypeOpen(false)}>
                        <label>TYPE</label>
                        <div onClick={() => toggleDropdown('type')} className={`dropdown ${isTypeOpen ? 'openDropdown' : ''} ${selectedTypeOption != 'Any' ? 'optionSelected' : ''}`}>
                            <input type="text" name='type' value={selectedTypeOption} readOnly />
                            {isTypeOpen && (
                                <div className="options">
                                    {selectedTypeOption != 'Any' ? <div
                                        className="option-item"
                                        onClick={() => setSelectedTypeOption('Any')}
                                    >   
                                        {'Any'}
                                    </div> : ''}
                                    {hometypes_array.map((option) => (
                                        selectedTypeOption != option ? <div
                                            className="option-item"
                                            key={option}
                                            onClick={() => setSelectedTypeOption(option)}
                                        >
                                            {option}
                                        </div> : ''
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='searchSubmitDiv'>
                        <button className='searchButton' type="submit"></button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Banner