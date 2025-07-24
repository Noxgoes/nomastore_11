'use client'

import Link from "next/link"
import { useProducts } from "./ProductContent";

export default function Cart(){
    const{cart}= useProducts(); // Importing cart from ProductsContext
    
    const numProducts= Object.keys(cart).reduce((acc,curr,currIndex) =>{
        const numProduct=cart[curr].quantity; // Get the quantity of the current product
        const sum=acc+parseInt(numProduct)
        return sum;

    } ,0)
    console.log("Number of products total:",numProducts) // Log the number of products in the cart
    // Get the number of products in the cart
    return(
        <div>
            <Link className="unstyed-button" href="/cart">
                <i className="fas fa-shopping-cart"></i>
           
                {numProducts>0 && (<div className="cart-num">
                    <p>{numProducts}</p>


                </div>)}
             </Link>
        </div>
    )

}