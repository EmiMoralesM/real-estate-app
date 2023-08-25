import React, { useContext, useState } from 'react'
import { Context } from '../assets/Context'
import axios from 'axios'

function SortProperties(props) {
    const { useOutsideClick } = useContext(Context)
    const sort_options_array = ['Homes for You', 'Price (Low to High)', 'Price (High to Low)', 'Square Feet']

    const [sortResults, setSortResults] = useState(sort_options_array[0])
    const [sortResultsOpen, setSortResultsOpen] = useState(false)

    const refSort = useOutsideClick(() => setSortResultsOpen(false))

    const sortProperties = (option) => {
        let sortedProps = props.properties
        console.log(props.properties);
        
        if (option == "Price (Low to High)"){
            sortedProps.sort((prop1, prop2) => {
                return prop1.price - prop2.price 
            })
        }
        if (option == "Price (High to Low)"){
            sortedProps.sort((prop1, prop2) => {
                return prop2.price - prop1.price
            })
        }
        console.log(sortedProps);

        // props.setProperties();
        // console.log(sortedProps);
        // props.setProperties([sortedProps[1], sortedProps[2]]);
    }

    return (
        <div className='sortButton' ref={refSort} onClick={() => setSortResultsOpen(prevSortResultsOpen => !prevSortResultsOpen)}>
            <p>Sort: {sortResults}</p>
            <p className={`arrow ${sortResultsOpen ? 'arrowActive' : ''}`}></p>
            {sortResultsOpen &&
                <div className='options sortOptions' >
                    {sort_options_array.map(option => (
                        <div
                            key={option}
                            className="option-item"
                            onClick={() => {
                                setSortResults(option)
                                sortProperties(option)
                            }}>{option}</div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SortProperties