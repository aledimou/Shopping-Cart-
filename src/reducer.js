export const reducer = (state, action)=>{

    if (action.type === "CLEAR_CART") {
        return {...state, cart: []}
    }

    if (action.type === "REMOVE_ITEM") {
        const newArray = state.cart.filter(item => item.id !== action.payload);
        return {...state, cart: newArray}
    }


    if (action.type === "INCEASE_ITEM") {
        
      let newCartI = state.cart.map((item)=>{
          if(item.id === action.payload){
            return {...item, amount: item.amount + 1}
          }
          return  item
      })
      return {...state, cart: newCartI}
    }

    if (action.type === "DECREASE_ITEM") {
        let newCartD = state.cart.map((item)=>{
            if (item.id === action.payload) {
                let newItemAmount = item.amount - 1
                if (newItemAmount < 0) {
                    return {...item, amount: 0}
                }
                    return {...item, amount: item.amount - 1}
            }
            return {...item}
        })
        return {...state, cart: newCartD}
    }


    if (action.type === "GET_TOTAL") {

       let {total, amount} = state.cart.reduce((cartTotal, item)=>{
            const {price, amount} = item;
           

            const itemTotal = price * amount; 
            cartTotal.total += itemTotal;    
            cartTotal.amount += amount;
        
            
            return cartTotal
       },
        {total: 0, amount: 0})
        total = parseFloat(total.toFixed(2))

        return {...state, total, amount} 
    }

    if (action.type === "LOADING") {
        return {...state, loading: true}
    }

    if (action.type === "DISPLAY_ITEMS") {
        return {...state, cart: action.payload, loading: false}
    }

    return state
}

