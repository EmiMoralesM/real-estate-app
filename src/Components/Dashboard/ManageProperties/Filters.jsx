import React, { useContext, useState } from 'react'
import { Context } from '../../../assets/Context'


function Filters(props) { 
    const { useOutsideClick, hometypes_array } = useContext(Context)
    const [priceFilterOpen, setPriceFilterOpen] = useState(false)
    const [bathsFilterOpen, setBathsFilterOpen] = useState(false)
    const [homeTypeFilterOpen, setHomeTypeFilterOpen] = useState(false)

    const [locationValue, setLocationValue] = useState('')

    const [minPriceOpen, setMinPriceOpen] = useState(false)
    const [minPrice, setMinPrice] = useState()
    const min_prices_array = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000]

    const [maxPriceOpen, setMaxPriceOpen] = useState(false)
    const [maxPrice, setMaxPrice] = useState()
    const max_prices_array = [500000, 600000, 700000, 800000, 900000, 1000000, 1250000, 1500000, 2000000, 2500000, 3000000]

    const beds_baths_array = [1, 2, 3, 4, 5]
    const [bedrooms, setBedrooms] = useState()
    const [bathrooms, setBathrooms] = useState()

    const [homeTypes, setHomeTypes] = useState([])
    
    const toggleHomeType = (option) => {
        if (homeTypes.includes(option)) {
            setHomeTypes(prevHomeTypes => prevHomeTypes.filter(type => option != type))
        } else {
            setHomeTypes(prevHomeTypes => [...prevHomeTypes, option])
        }
    }

    const toggleDropdown = (filter) => {
        if (filter === 'price') {
            setPriceFilterOpen(prevPriceFilterOpen => !prevPriceFilterOpen)
        }
        if (filter === 'baths') {
            setBathsFilterOpen(prevBathsFilterOpen => !prevBathsFilterOpen)
        }
        if (filter === 'homeType') {
            setHomeTypeFilterOpen(prevHomeTypeFilterOpen => !prevHomeTypeFilterOpen)
        }
    }

    const handleClickOutside = () => {
        setPriceFilterOpen(false)
        setBathsFilterOpen(false)
        setHomeTypeFilterOpen(false)
    }

    // This returns a reference. And creates an event listener that will activate with every click outside the reference. (Form Context.jsx)
    const refPrice = useOutsideClick(handleClickOutside)
    const refBaths = useOutsideClick(handleClickOutside)
    const refHomeType = useOutsideClick(handleClickOutside)

    return (
        <>
            <div className='locationSearchDiv'>
                <input
                    className='generalInput locationInput'
                    type="text"
                    name="search"
                    placeholder="City, Neighborhood, Address"
                    value={locationValue}
                    onChange={(event) => setLocationValue(event.target.value)}
                />
                <p className='locationSearchIcon'></p>
            </div>
            <div ref={priceFilterOpen ? refPrice : null}>
                <button className='generalInput filterButton' onClick={() => toggleDropdown('price')}>
                    {props.minPrice || props.maxPrice ?
                        `${props.minPrice ?
                            `$${Intl.NumberFormat().format(props.minPrice)}+` : ' '} 
                        ${props.maxPrice ?
                            `$${Intl.NumberFormat().format(props.maxPrice)}-` : ' '}`
                        : 'Price'}
                    <span className={`arrow ${priceFilterOpen ? 'arrowActive' : ''}`}></span>
                </button>
                {priceFilterOpen && (
                    <div className='filtersDropdown' >
                        <p className='filterTitle'>Price Range</p>
                        <div className='priceFilters'>
                            <div
                                onClick={() => setMinPriceOpen(prevMinPriceOpen => !prevMinPriceOpen)}
                                className='individualFilterDropdown'
                            >
                                <p className='filterSubTitle'>Minimum Price</p>
                                <div className='individualFilterButton'>
                                    <input type="text" name='state' value={minPrice ? `$${Intl.NumberFormat().format(minPrice)}` : 'No Min'} readOnly />
                                    <p className={`arrow ${minPriceOpen ? 'arrowActive' : ''}`}></p>
                                </div>
                                <div className={`options filterOptions ${minPriceOpen ? '' : 'hideOptions'}`}>
                                    <div className="option-item" onClick={() => setMinPrice()}>No Min</div>
                                    {min_prices_array.map((option) => (
                                        <div
                                            className="option-item"
                                            key={option}
                                            onClick={() => setMinPrice(option)}
                                        >
                                            ${Intl.NumberFormat().format(option)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div
                                onClick={() => setMaxPriceOpen(prevMaxPriceOpen => !prevMaxPriceOpen)}
                                className='individualFilterDropdown'
                            >
                                <p className='filterSubTitle'>Maximum Price</p>
                                <div className='individualFilterButton'>
                                    <input type="text" name='state' value={maxPrice ? `$${Intl.NumberFormat().format(maxPrice)}` : 'No Max'} readOnly />
                                    <p className={`arrow ${maxPriceOpen ? 'arrowActive' : ''}`}></p>
                                </div>
                                <div className={`options filterOptions ${maxPriceOpen ? '' : 'hideOptions'}`}>
                                    <div className="option-item" onClick={() => setMaxPrice()}>No Max</div>
                                    {max_prices_array.map((option) => (
                                        <div
                                            className="option-item"
                                            key={option}
                                            onClick={() => setMaxPrice(option)}
                                        >
                                            ${Intl.NumberFormat().format(option)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='applyFilterDiv'>
                            <button onClick={() => {
                                // When the user clicks the button, we set the filters and "activate" the useEffect that fetches the data
                                props.setMinPrice(minPrice)
                                props.setMaxPrice(maxPrice)
                                setMinPriceOpen(false)
                                setMaxPriceOpen(false)
                                setPriceFilterOpen(false)
                            }}>Filter</button>
                        </div>
                    </div>
                )}
            </div>
            <div ref={bathsFilterOpen ? refBaths : null}>
                <button className='generalInput filterButton' onClick={() => toggleDropdown('baths')}>
                    {props.minBaths > 0 || props.minBeds > 0 ?
                        `${props.minBeds > 0 ?
                            `${props.minBeds}+ bd` : ' '} 
                        ${props.minBaths > 0 ?
                            `${props.minBaths}+ ba` : ' '}`
                        : 'Beds & Baths'}
                    <span className={`arrow ${bathsFilterOpen ? 'arrowActive' : ''}`}></span>
                </button>
                {bathsFilterOpen && (
                    <div className='filtersDropdown' >
                        <p className='filterTitle'>Number of Rooms</p>
                        <div className='bathsOptions'>
                            <p>Bedrooms</p>
                            <div>
                                <p className={`first ${bedrooms ? '' : 'active'}`} onClick={() => setBedrooms(0)}>Any</p>
                                {beds_baths_array.map((option) => (
                                    <p className={`${option == beds_baths_array.length ? 'last' : ''} ${option == bedrooms ? 'active' : ''}`}
                                        onClick={() => setBedrooms(option)}
                                        key={option}
                                    >{option}+</p>
                                ))}
                            </div>
                            <p>Bathrooms</p>
                            <div>
                                <p className={`first ${bathrooms ? '' : 'active'}`} onClick={() => setBathrooms(0)}>Any</p>
                                {beds_baths_array.map((option) => (
                                    <p className={`${option == beds_baths_array.length ? 'last' : ''} ${option == bathrooms ? 'active' : ''}`}
                                        onClick={() => setBathrooms(option)}
                                        key={option}
                                    >{option}+</p>
                                ))}
                            </div>
                        </div>
                        <div className='applyFilterDiv'>
                            <button onClick={() => {
                                props.setMinBaths(bathrooms)
                                props.setMinBeds(bedrooms)
                                setBathsFilterOpen(false)
                            }}>Filter</button>
                        </div>
                    </div>
                )}
            </div>
            <div ref={homeTypeFilterOpen ? refHomeType : null}>
                <button className='generalInput filterButton' onClick={() => toggleDropdown('homeType')}>Home Type {props.homeTypes.length != 0 ? `(${props.homeTypes.length})` : ''} <span className={`arrow ${homeTypeFilterOpen ? 'arrowActive' : ''}`}></span></button>
                {homeTypeFilterOpen && (
                    <div className='filtersDropdown' >
                        <p className='filterTitle'>Home Type</p>
                        <div className='hometypeOptions'>
                            <ul>
                                {hometypes_array.map(option => (
                                    <li onClick={() => toggleHomeType(option)} key={option}>
                                        <span className={`checkboxHometype ${homeTypes.includes(option) ? 'active' : ''}`}></span>
                                        <p>{option}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='applyFilterDiv'>
                            <button onClick={() => {
                                props.setHomeTypes(homeTypes)
                                setHomeTypeFilterOpen(false)
                                // props.setProperties()
                            }}>Filter</button>
                        </div>
                    </div>
                )}
            </div>
            {(props.minPrice || props.maxPrice || props.minBaths || props.minBeds || props.homeTypes.length != 0) && <div>
                <button className='generalInput filterButton removeFiltersButton' onClick={() => {
                    props.setMinPrice()
                    props.setMaxPrice()
                    props.setMinBaths()
                    props.setMinBeds()
                    props.setHomeTypes([])
                    setHomeTypes([])
                }}>Remove filters
                    {/* <span className='x'></span> */}
                </button>
            </div>}
        </>
    )
}

export default Filters