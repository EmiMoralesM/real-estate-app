import React, { Component } from "react"

// Create a context
export const Context = React.createContext()

// class ContextProvider extends Component {

//     render() {
//         return (
//             <Context.Provider value={{ SERVER_URL: SERVER_URL}}>
//                 {this.props.children}
//             </Context.Provider>
//         )
//     }
// }

// // We export the provider and the Context itself (to then be able to use the useContext hook)
// export { ContextProvider, Context }

export function ContextProvider({ children }) {
    const SERVER_URL = 'http://localhost'

    return (
        <Context.Provider value={{ SERVER_URL: SERVER_URL }}>
            {children}
        </Context.Provider>
    )

}