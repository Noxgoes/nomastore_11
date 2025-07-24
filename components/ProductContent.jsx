'use client'
import{useState,useContext,createContext} from 'react'
const ProductContext = createContext(); // Create a context for products

export default function ProductsProvider(props) {
    const{children}=props
    const[cart,setCart]=useState({}) //Initialize cart state
    

    function handleIncrementProduct(price_id,num,data,noIncrement = false){
        const newCart = {...cart} // Create a copy of the cart
        if(price_id in cart){
            newCart[price_id] ={
            ...data,
            quantity: noIncrement ? num : newCart[price_id]?.quantity + num 
            }
        } else {
            newCart[price_id] = {
                ...data,
                quantity:num // Add new product with quantity
            } // Add new product with quantity

        }
        if (parseInt(newCart[price_id].quantity) <= 0){
            delete newCart[price_id]; // Remove product if quantity is zero
        }
        setCart(newCart); 
    }
    const value = {cart,handleIncrementProduct} // Create context value


    return (
       
        <ProductContext.Provider value={value}>
            {children}  
        </ProductContext.Provider>

    )

}
export const useProducts=()=>useContext(ProductContext) // Custom hook to use context
