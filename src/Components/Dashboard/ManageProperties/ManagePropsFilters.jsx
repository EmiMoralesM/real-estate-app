import React, { useState } from 'react'

function ManagePropsFilters(props) {
    const hometypes_array = ['Houses', 'Townhomes', 'Multy-family', 'Condos', 'Aparments']

    const [homeTypeOpen, setHomeTypeOpen] = useState(false)
    const [hometypes, setHometypes] = useState([])
    
    const toggleHomeType = (option) => {
        if (hometypes.includes(option)) {
            setHometypes(prevHometypes => prevHometypes.filter(type => option != type))
        } else {
            setHometypes(prevHometypes => [...prevHometypes, option])
        }
    }
    return (
        <div className='filters'>
            <div className='addressFilterDiv'>
                <input
                    className='generalInput'
                    type="text"
                    name="address"
                    placeholder="City, Neighborhood, Address"
                // value={locationValue}
                // onChange={(event) => setLocationValue(event.target.value)}
                />
            </div>
            <div className='priceFilterDiv'>
                <div>
                    <span>$</span>
                    <input
                        className='generalInput'
                        type="number"
                        placeholder="Min Price"
                        value={props.minPriceFilter}
                        onChange={(event) => props.setMinPriceFilter(event.target.value)}
                    />
                </div>
                <p>-</p>
                <div>
                    <span>$</span>
                    <input
                        className='generalInput'
                        type="number"
                        name="address"
                        placeholder="Max Price"
                    // value={locationValue}
                    // onChange={(event) => setLocationValue(event.target.value)}
                    />
                </div>
            </div>
            <div className='homeTypeFilterDiv'>
                <button className='generalInput '
                    onClick={() => setHomeTypeOpen(prevHomeTypeOpen => !prevHomeTypeOpen)}>
                    Home Type {hometypes.length > 0 ? `(${hometypes.length})` : ''}
                    <span className={`arrow ${homeTypeOpen ? 'arrowActive' : ''}`}></span>
                </button>
                {homeTypeOpen && (
                    <div className='filtersDropdown' >
                        <div className='hometypeOptions'>
                            <ul>
                                {hometypes_array.map(option => (
                                    <li onClick={() => toggleHomeType(option.toLowerCase())} key={option}>
                                        <span className={`checkboxHometype ${hometypes.includes(option.toLowerCase()) ? 'active' : ''}`}></span>
                                        <p>{option}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <button className='button'>Apply Filters</button>
        </div>
    )
}

export default ManagePropsFilters