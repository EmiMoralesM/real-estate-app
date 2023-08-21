import React, { useContext } from 'react'
import { Context } from '../../assets/Context'

function ConfirmDeleteProperty(props) {
    const { enableScroll, imageUrl} = useContext(Context)

    return (
        <aside className='generalModal'>
            <div className='deletePropertyModalDiv'>
                <div className='generalModalContent'>
                    <h3>Are you sure you want to delete this property?</h3>
                    <div className='deletePropertyContent'>
                        <div className='imgDiv'>
                            <img src={imageUrl(props.confirmDeleteModal.mainImage)} alt="" />
                        </div>
                        <div>
                            <h3>${Intl.NumberFormat().format(props.confirmDeleteModal.price)} - <span> {props.confirmDeleteModal.statusText}</span></h3>
                            <p>{props.confirmDeleteModal.address}</p>
                        </div>
                    </div>
                    <div className='deleteUserEditActions'>
                        <button onClick={() => {
                            enableScroll()
                            props.setConfirmDeleteModal(false)
                        }} className='confirmUserChange'>Cancel</button>
                        <button onClick={props.handlePropertyDelete} className='deleteUser'>Delete</button>
                    </div>
                </div>
            </div>
            <div onClick={() => {
                enableScroll()
                props.setConfirmDeleteModal(false)
            }} className='generalModalBackground'></div>
        </aside>
    )
}

export default ConfirmDeleteProperty