import React, { useEffect, useState } from 'react'

function Pagination(props) {
    const [propsPerPage, setPropsPerPage] = useState(20)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (props.properties) {
            let lastPropIndex = props.currentPage * propsPerPage
            let firstPropIndex = lastPropIndex - propsPerPage
            props.setCurrentProperties(props.properties.slice(firstPropIndex, lastPropIndex))
            console.log(props.properties.slice(firstPropIndex, lastPropIndex));
            setTotalPages(Math.ceil(props.properties.length / propsPerPage))
        }
    }, [props.currentPage, props.properties])


    return (
        <div className='paginationDiv'>
            <div className='prevPage' onClick={() => {
                if (props.currentPage > 1) {
                    props.setCurrentPage(prevPage => prevPage - 1)
                }
            }}></div>
            {props.currentPage > 2 && <p onClick={() => props.setCurrentPage(1)}>1</p>}
            {props.currentPage > 3 && <span>...</span>}

            {props.currentPage > 1 && <p onClick={() => props.setCurrentPage(props.currentPage - 1)}>{props.currentPage - 1}</p>}

            <p className='activePage'>{props.currentPage}</p>

            {props.currentPage < totalPages && <p onClick={() => props.setCurrentPage(props.currentPage + 1)}>{props.currentPage + 1}</p>}

            {props.currentPage < totalPages - 2 && <span>...</span>}
            {props.currentPage < totalPages - 1 && <p onClick={() => props.setCurrentPage(totalPages)}>{totalPages}</p>}

            <div className='nextPage' onClick={() => {
                if (props.currentPage < totalPages) {
                    props.setCurrentPage(prevPage => prevPage + 1)
                }
            }}></div>
        </div>
    )
}

export default Pagination