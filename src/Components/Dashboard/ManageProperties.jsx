import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../assets/Context'
import { LocationContext } from '../../assets/LocationContext'
import Filters from '../Filters'
import EditPropertyModal from '../Modals/EditPropertyModal'
import ConfirmDeleteProperty from '../Modals/ConfirmDeleteProperty'
import SortProperties from '../SortProperties'
import Pagination from '../Pagination'

function ManageProperties(props) {
    const { SERVER_URL, disableScroll, enableScroll, imageUrl, changeSuccessMessage, changeErrorMessage, user, } = useContext(Context)
    const { locationCoordinates, fetchPropertiesData, homeTypes, setHomeTypes } = useContext(LocationContext)
    const [results, setResults] = useState()

    const [sortPropertes, setSortPropertes] = useState('Homes for You');

    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [minBaths, setMinBaths] = useState()
    const [minBeds, setMinBeds] = useState()

    useEffect(() => {
        setResults()
        // Function (from LocationContext) that fetches the properties with the specified filters.
        fetchPropertiesData(setResults, locationCoordinates, maxPrice, minPrice, minBaths, minBeds, homeTypes, sortPropertes);
    }, [locationCoordinates, maxPrice, minPrice, minBaths, minBeds, homeTypes, sortPropertes])

    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const [editPropertyModal, setEditPropertyModal] = useState(false)

    const [currentProperties, setCurrentProperties] = useState([])
    const [currentPage, setCurrentPage] = useState(1)


    const handlePropertyDelete = async () => {
        if (user.role == 'admin') {
            await axios.delete(`${SERVER_URL}/deleteProperty/${confirmDeleteModal._id}`)
                .then(res => {
                    setConfirmDeleteModal(false)
                    enableScroll()
                    changeSuccessMessage(`Property deleted!`)
                    setResults(prevResults => prevResults.filter(prop => prop._id !== confirmDeleteModal._id))
                })
                .catch(err => console.log(`Error: ${err}`))
        } else {
            changeErrorMessage(`Only admins can perform this action`)
            enableScroll()
        }
    }

    return (
        <div className='whiteBackground manageProperties'>
            <div className='headerManageProps'>
                <div className='managePropertiesFilterDiv'>
                    <Filters
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        minBaths={minBaths}
                        setMinBaths={setMinBaths}
                        minBeds={minBeds}
                        setMinBeds={setMinBeds}
                        homeTypes={homeTypes}
                        setHomeTypes={setHomeTypes}
                    />
                </div>
                <SortProperties
                    properties={props.properties}
                    setProperties={props.setProperties}

                    sortPropertes={sortPropertes}
                    setSortPropertes={setSortPropertes}
                />
            </div>
            <div className='propertiesDiv'>
                {(!results) ? (
                    <>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className='loadingProperty loadingPropertyDashboard'>
                                <div className='loadingPropertyImage' />
                                <div className='infoDiv'>
                                    <span className='priceLoading' />
                                    <span className='infoLoading' />
                                    <span className='infoLoading' />
                                </div>
                            </div>
                        ))}
                    </>
                ) : (currentProperties.map(property => (
                    <div key={property._id} className='propertyDiv managePropertiesResults'>
                        <div className='imagePropertyDiv'>
                            <div className='imageContent'>
                                <button onClick={() => {
                                    disableScroll()
                                    setConfirmDeleteModal(property)
                                }} className='button deletePropertyButton'>Delete Property</button>
                                <button onClick={() => {
                                    disableScroll()
                                    setEditPropertyModal(property)
                                }} className='button editPropertyButton'>Edit Property</button>
                                <div >
                                    <p className='location'>{property.addressCity}, {property.addressState}</p>
                                </div>
                            </div>
                            <div className='imageDiv'>
                                <img src={imageUrl(property.mainImage)} alt="" />
                            </div>
                        </div>
                        <div className='infoDiv'>
                            <p className='price'>${Intl.NumberFormat().format(property.price)}</p>
                            <p className='beds-baths-sqft'>
                                <span className='beforeIcon'> {property.beds ? property.beds : '--'} </span> |
                                <span className='beforeIcon'> {property.baths ? property.baths : '--'} </span> |
                                <span className='beforeIcon'> {Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} ft. </span> -
                                <span> {property.statusText} </span>
                            </p>
                            <p className='address'>{property.address}</p>
                        </div>
                    </div>
                ))
                )}
                <Pagination
                    properties={results}
                    currentProperties={currentProperties}
                    setCurrentProperties={setCurrentProperties}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            {confirmDeleteModal && <ConfirmDeleteProperty
                blockForAdmin={true}
                handlePropertyDelete={handlePropertyDelete}
                setConfirmDeleteModal={setConfirmDeleteModal}
                confirmDeleteModal={confirmDeleteModal}
            />}
            {editPropertyModal && <EditPropertyModal
                blockAdmin={true}
                setResults={setResults}
                editProperty={editPropertyModal}
                setEditProperty={setEditPropertyModal}
            />}
        </div>
    )
}

export default ManageProperties