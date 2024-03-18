import React, {createContext, useContext, useState} from 'react';

const stateContext = createContext() 

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false
}

export const ContextProider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [isClicked, setisClicked] = useState(initialState)
    const handleClick = (clicked) => {
        setisClicked({...initialState, [clicked]: true})
    }
    const [screenSize, setScreenSize] = useState(undefined)
    return (
        <stateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setisClicked,
                handleClick,
                screenSize,
                setScreenSize
            }}
        >
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext)