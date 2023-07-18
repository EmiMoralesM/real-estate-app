import React, { Component } from "react"

// Create a context
const Context = React.createContext()

class ContextProvider extends Component {
    emailError = ''
    checkEmail = (email) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            emailError = 'Enter a valid email address'
        } else {
            emailError = ''
            return true
        }
    }

    render() {
        return (
            <Context.Provider value={{ checkEmail: this.checkEmail, emailError: this.emailError}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

// We export the provider and the Context itself (to then be able to use the useContext hook)
export { ContextProvider, Context }
