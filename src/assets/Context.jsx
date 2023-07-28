import React, { Component, useEffect, useRef, useState } from "react"

// Create a context
export const Context = React.createContext()

export function ContextProvider({ children }) {
    // const SERVER_URL = 'https://real-estate-app-server.onrender.com'
    const SERVER_URL = 'http://localhost'

    const hometypes_array = ['House', 'Townhome', 'Multy-family', 'Condo', 'Aparment']
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

    const disableScroll = () => {
        document.body.classList.add("noScroll");
    }

    const enableScroll = () => {
        document.body.classList.remove("noScroll");
    }

    return (
        <Context.Provider value={{ SERVER_URL, useOutsideClick, user, setUser, hometypes_array, disableScroll, enableScroll }}>
            {children}
        </Context.Provider>
    )

}