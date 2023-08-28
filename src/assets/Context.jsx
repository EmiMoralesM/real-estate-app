import axios from "axios"
import React, { Component, useEffect, useRef, useState } from "react"

// Create a context
export const Context = React.createContext()

export function ContextProvider({ children }) {
    // const SERVER_URL = 'https://real-estate-app-server.onrender.com'
    const SERVER_URL = 'http://localhost'

    const hometypes_array = ['House', 'Townhouse', 'Multy-family', 'Condo']
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {})


    // Function to close pop ups when click outside
    const useOutsideClick = (callback) => {
        const ref = useRef()

        useEffect(() => {
            const handleClick = (event) => {
                // console.log('Reference Current:',ref.current);
                // console.log('Target clicked:', event.target);
                if (ref.current && !ref.current.contains(event.target)) {
                    callback()
                    enableScroll()
                }
            }
            document.addEventListener('click', handleClick)
            return () => {
                document.removeEventListener('click', handleClick)
            }
        }, [ref])

        return ref
    }

    // Format the image route
    const imageUrl = (image) => {
        if (image.includes('http')) {
            return image
        } else {
            return `${SERVER_URL}/images/${image}`
        }
    }
    // const [disableScroll, setDisableScroll] = useState(false)
    const disableScroll = () => {
        // console.log(document.body.classList);
        document.body.classList.add('noScroll');
        // setDisableScroll(true)
    }

    const enableScroll = () => {
        document.body.classList.remove("noScroll");
    }

    const [successMessage, setSuccessMessage] = useState('')
    const changeSuccessMessage = (message) => {
        setSuccessMessage(message)
        setTimeout(() => setSuccessMessage(''), 4200)
    }

    const [errorMessage, setErrorMessage] = useState('')
    const changeErrorMessage = (message) => {
        setErrorMessage(message)
        setTimeout(() => setErrorMessage(''), 4200)
    }

    return (
        <Context.Provider value={{ SERVER_URL, useOutsideClick, user, setUser, hometypes_array, disableScroll, enableScroll, imageUrl, successMessage, changeSuccessMessage, errorMessage, changeErrorMessage }}>
            {children}
        </Context.Provider>
    )

}