import React, { useContext, useState } from 'react'
import { Context } from '../assets/Context'

function SortProperties(props) {
    const { useOutsideClick } = useContext(Context)
    const sort_options_array = ['Homes for You', 'Price (Low to High)', 'Price (High to Low)', 'Lot Size', 'Bedrooms', 'Bathrooms']

    const [sortResultsOpen, setSortResultsOpen] = useState(false)

    const refSort = useOutsideClick(() => setSortResultsOpen(false))

    return (
        <div className='sortButton' ref={refSort} onClick={() => setSortResultsOpen(prevSortResultsOpen => !prevSortResultsOpen)}>
            <p>Sort: {props.sortPropertes}</p>
            <p className={`arrow ${sortResultsOpen ? 'arrowActive' : ''}`}></p>
            {sortResultsOpen &&
                <div className='options sortOptions' >
                    {sort_options_array.map(option => (
                        <div
                            key={option}
                            className="option-item"
                            onClick={() => {
                                props.setSortPropertes(option)
                            }}>{option}</div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SortProperties