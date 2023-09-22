import React, { useContext, useState } from 'react'
import { Context } from '../../assets/Context'
import axios from 'axios'

function ContactOwner(props) {
    const { SERVER_URL, user, changeSuccessMessage, changeErrorMessage } = useContext(Context)

    const [nameContact, setNameContact] = useState(user.name)
    const [emailContact, setEmailContact] = useState(user.email)

    const sendMessageToOwner = async () => {
        if (props.property.ownerId) {
            await axios.post(`${SERVER_URL}/postNotification/${props.property.ownerId}`, {
                propertyId: props.property._id,
                propertyAddress: props.property.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', ''),
                nameContact: nameContact,
                emailContact: emailContact,
                messageContact: props.messageContact,
            })
                .then((res) => {
                    changeSuccessMessage('Message Send!')
                    props.setOpenContactModal(false)
                })
                .catch((e) => {
                    changeErrorMessage("Couldn't send the message");
                })
        } else {
            // The property has no owner defined
            props.setOpenContactModal(false)
            changeSuccessMessage('Message Send!')
        }
    }

    return (
        <aside className='generalModal contactOwnerModal'>
            <div className={`generalModalDiv`}>
                <button className='closeModal' onClick={() => props.setOpenContactModal(false)}></button>
                <div className='generalModalContent'>
                    <h3>Contact Owner</h3>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" value={nameContact} onChange={(e) => setNameContact(e.target.value)} name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="text" value={emailContact} onChange={(e) => setEmailContact(e.target.value)} name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Message</label>
                        <textarea name="" id="" value={props.messageContact} onChange={(e) => props.setMessageContact(e.target.value)} cols="30" rows="10"></textarea>
                    </div>
                    <div className='sendOwnerMessage'>
                        <button className="button" onClick={sendMessageToOwner}>Send</button>
                    </div>
                </div>
            </div>
            <div onClick={() => props.setOpenContactModal(false)} className='generalModalBackground'></div>
        </aside>
    )
}

export default ContactOwner