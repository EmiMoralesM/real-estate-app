import React, { useContext, useState } from 'react'
import { Context } from '../assets/Context'
import axios from 'axios'

function SortProperties(props) {
    const { useOutsideClick } = useContext(Context)
    const sort_options_array = ['Homes for You', 'Price (Low to High)', 'Price (High to Low)', 'Lot Size', 'Bedrooms', 'Bathrooms']

    // const [sortResults, setSortResults] = useState(sort_options_array[0])
    const [sortResultsOpen, setSortResultsOpen] = useState(false)

    const refSort = useOutsideClick(() => setSortResultsOpen(false))

    const sortProperties = (option) => {
        console.log(props.properties);
        let sortedProps = props.properties
        
        // if (option == "Price (Low to High)"){
        //     sortedProps.sort((prop1, prop2) => {
        //         return prop1.price - prop2.price 
        //     })
        // }
        // if (option == "Price (High to Low)"){
        //     sortedProps.sort((prop1, prop2) => {
        //         return prop2.price - prop1.price
        //     })
        // }
        // console.log(sortedProps);

        // props.setProperties();
        // console.log(sortedProps);
        // props.setProperties(sortedProps);
    }

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
                                // sortProperties(option)
                            }}>{option}</div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SortProperties