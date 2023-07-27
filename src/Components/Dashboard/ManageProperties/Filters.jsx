import React, { useContext, useState } from 'react'
import { Context } from '../../../assets/Context'


function Filters(props) {
    const { useOutsideClick, hometypes_array } = useContext(Context)
    const [priceFilterOpen, setPriceFilterOpen] = useState(false)
    const [bathsFilterOpen, setBathsFilterOpen] = useState(false)
    const [hometypeFilterOpen, setHometypeFilterOpen] = useState(false)

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

    const [hometypes, setHometypes] = useState([])
    const toggleHomeType = (option) => {
        if (hometypes.includes(option)) {
            setHometypes(prevHometypes => prevHometypes.filter(type => option != type))
        } else {
            setHometypes(prevHometypes => [...prevHometypes, option])
        }
    }

    const toggleDropdown = (filter) => {
        if (filter === 'price') {
            setPriceFilterOpen(prevPriceFilterOpen => !prevPriceFilterOpen)
        }
        if (filter === 'baths') {
            setBathsFilterOpen(prevBathsFilterOpen => !prevBathsFilterOpen)
        }
        if (filter === 'hometype') {
            setHometypeFilterOpen(prevHometypeFilterOpen => !prevHometypeFilterOpen)
        }
    }

    const handleClickOutside = () => {
        setPriceFilterOpen(false)
        setBathsFilterOpen(false)
        setHometypeFilterOpen(false)
    }

    // This returns a reference. And creates an event listener that will activate with every click outside the reference. (Form Context.jsx)
    const refPrice = useOutsideClick(handleClickOutside)
    const refBaths = useOutsideClick(handleClickOutside)
    const refHometype = useOutsideClick(handleClickOutside)

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
            <div ref={hometypeFilterOpen ? refHometype : null}>
                <button className='generalInput filterButton' onClick={() => toggleDropdown('hometype')}>Home Type {hometypes.length > 0 ? `(${hometypes.length})` : ''} <span className={`arrow ${hometypeFilterOpen ? 'arrowActive' : ''}`}></span></button>
                {hometypeFilterOpen && (
                    <div className='filtersDropdown' >
                        <p className='filterTitle'>Home Type</p>
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
                        <div className='applyFilterDiv'>
                            <button>Filter</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Filters