// eslint-disable-next-line
import React, { useContext, useReducer, useEffect } from 'react'
import {reducer} from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0
}


const AppProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer,initialState)



  const clearCart = ()=>{
    dispatch({type: "CLEAR_CART"})
  }
  
  const removeItem = (id)=>{
    dispatch({type: "REMOVE_ITEM",payload: id})
  }

  const increaseItemCart = (id)=>{
    dispatch({type: "INCEASE_ITEM", payload: id})
  }

  const decreaseItemCart = (id)=>{
    dispatch({type: "DECREASE_ITEM", payload: id})
  }

  const fetchData = async()=>{
    
    dispatch({type: "LOADING"})

    const response = await fetch(url)
    const cart = await response.json();

    dispatch({type: "DISPLAY_ITEMS", payload: cart})
  }

  useEffect(() => {
    fetchData();
    // return () => {
    //   cleanup
    // }
  }, [])

  useEffect(() => {
    dispatch({type: "GET_TOTAL"})
    // return () => {
    //   cleanup
    // }
  }, [state.cart])
  

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItemCart,
        decreaseItemCart
        
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
