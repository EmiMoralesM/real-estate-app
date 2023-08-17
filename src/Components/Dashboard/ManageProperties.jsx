import React, { useContext, useEffect, useState } from 'react'
import ManagePropsFilters from './ManageProperties/ManagePropsFilters'
import axios from 'axios'
import { Context } from '../../assets/Context'
import Filters from './ManageProperties/Filters'
import EditPropertyModal from '../Modals/EditPropertyModal'
import ConfirmDeleteProperty from '../Modals/ConfirmDeleteProperty'

function ManageProperties(props) {
    const { SERVER_URL, hometypes_array, disableScroll, enableScroll, imageUrl, changeSuccessMessage } = useContext(Context)
    const [results, setResults] = useState()

    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [minBaths, setMinBaths] = useState()
    const [minBeds, setMinBeds] = useState()
    const [homeTypes, setHomeTypes] = useState([])

    useEffect(() => {
        setResults()
        async function fetchData() {
            // Fetch the properties with the filters specified 
            await axios.get(axios.get(`${SERVER_URL}/getProperties?minPrice=${minPrice ? minPrice : 0}&maxPrice=${maxPrice ? maxPrice : 0}&minBaths=${minBaths ? minBaths : 0}&minBeds=${minBeds ? minBeds : 0}&homeTypes=${homeTypes.length == 0 ? hometypes_array : homeTypes}`)
                .then((data) => setResults(data.data))
                .catch(err => console.log(`Error: ${err}`)))
        }
        fetchData();
    }, [maxPrice, minPrice, minBaths, minBeds, homeTypes])

    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const [editPropertyModal, setEditPropertyModal] = useState(false)

    const handlePropertyDelete = async () => {
        await axios.delete(`${SERVER_URL}/deleteProperty/${confirmDeleteModal._id}`)
            .then(res => {
                setConfirmDeleteModal(false)
                enableScroll()
                changeSuccessMessage(`Property deleted!`)
                setResults(prevResults => prevResults.filter(prop => prop._id !== confirmDeleteModal._id))
            })
            .catch(err => console.log(`Error: ${err}`))
    }

    return (
        <div className='whiteBackground manageProperties'>
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
                    setHomeTypes={setHomeTypes}
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
                ) : (results.map(property => (
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
                                <span className='beforeIcon'> {Intl.NumberFormat().format(property.lotAreaUnit == 'sqft' ? property.lotSize : parseInt(property.lotSize * 43560))} sqft </span> -
                                <span> {property.statusText} </span>
                            </p>
                            <p className='address'>{property.address}</p>
                        </div>
                    </div>
                ))
                )}
            </div>
            {confirmDeleteModal && <ConfirmDeleteProperty
                handlePropertyDelete={handlePropertyDelete}
                setConfirmDeleteModal={setConfirmDeleteModal}
                confirmDeleteModal={confirmDeleteModal}
            />}
            {editPropertyModal && <EditPropertyModal
                setResults={setResults}
                editProperty={editPropertyModal}
                setEditProperty={setEditPropertyModal}
            />}
        </div>
    )
}

export default ManageProperties