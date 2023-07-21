import React, { Component, useEffect, useRef } from "react"

// Create a context
export const Context = React.createContext()

export function ContextProvider({ children }) {
    const SERVER_URL = 'https://real-estate-app-server.onrender.com'

    // Function to close pop ups when click outside
    const useOutsideClick = (callback) => {
        const ref = useRef()

        useEffect(() => {
            const handleClick = (event) => {
                // console.log('Reference Current:',ref.current);
                // console.log('Target clicked:', event.target);
                if (ref.current && !ref.current.contains(event.target)) {
                    callback()
                }
            }
            document.addEventListener('click', handleClick)
            return () => {
                document.removeEventListener('click', handleClick)
            }
        }, [ref])

        return ref
    }

    return (
        <Context.Provider value={{ SERVER_URL: SERVER_URL, useOutsideClick: useOutsideClick }}>
            {children}
        </Context.Provider>
    )

}