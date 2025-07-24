'use client'
import { useRouter } from 'next/navigation.js';
import { useProducts } from "@/components/ProductContent"
import Link from "next/link"


async function createCheckout() {
    try {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL
        const lineItems = Object.keys(cart).map((item, itemIndex) => {
            return {
                price: item,
                quantity: cart[item].quantity
            }
        })

        const response = await fetch(baseURL + '/api/checkout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ lineItems })
        })

        // Check if response is ok
        if (!response.ok) {
            console.error('Checkout API error:', response.status, response.statusText);
            alert('Checkout failed. Please try again.');
            return;
        }

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('API returned non-JSON response');
            alert('Server error. Please try again.');
            return;
        }

        const data = await response.json();
        
        if (data.url) {
            router.push(data.url);
        } else {
            console.error('No checkout URL received:', data);
            alert('Checkout failed. Please try again.');
        }
        
    } catch (err) {
        console.log('Error creating checkout:', err.message);
        alert('Checkout failed. Please try again.');
    }
}


   const total = Object.keys(cart).reduce((acc, curr) => {
        // use the reduce function to interative cumulate a value

        // 1. use the price_id to find the data for the product in the cart
        const cartItem = cart[curr]

        // 2. find the quantity of said product
        const quantity = cartItem.quantity

        // 3. find the cost in cents of said product
        const cost = cartItem.prices[0].unit_amount

        // 4. take the current total (acc) and add on to it the quantity of the current product multiplied by it's cost
        const sum = acc + cost * quantity

        // 5. return the sum which then becomes the accumlated value for the next iteration
        return sum
    }, 0)


  return (
    <section className="cart-section">
    <h2> Your Cart</h2>
    {Object.keys(cart).length === 0 &&(<p className="text-medium">your cart is empty kid, FILL IT UP!!</p>)}
    <div className="cart-container">
        {Object.keys(cart).map((item, itemindex) => {//item is the price_id of the product in the cart
            const itemData = cart[item];
            const itemQuantity = itemData.quantity;
            const imgName = itemData.name ==="Cristiano Ronaldo Wall poster" ? "poster": itemData.name.replaceAll(" ", "_");
            const imgUrl = `mid_res/${imgName}.jpg`;
            
             //this return is for each item in the cart ,,of object.keys
            return (
                        <div key={itemindex} className="cart-item">
                            <img src={imgUrl} alt={imgName + '-img'} />
                            <div className="cart-item-info">
                                <h3>{itemData.name}</h3>
                                <p>{itemData.description.slice(0, 150)}{itemData.description.length > 150 ? '...' : ''} </p>
                                <h4>₹{itemData.prices[0].unit_amount / 100}</h4>
                                <div className="quantity-container">
                                    <p><strong>Quantity</strong></p>
                                    <input type="number" value={itemQuantity} placeholder="2" onChange={(e) => {
                                        const newValue = e.target.value


                                        handleIncrementProduct(itemData.default_price, newValue, itemData, true)
                                    }} />
                                </div>
                            </div>
                        </div>
                    )
        })}
        </div>
        <div className="checkout-container">
            <Link href={'/'}>
                <button>&larr; Continue shopping</button>
            </Link>
            <button onClick={createCheckout}>Checkout &rarr;</button>
        </div>
    </section>
  )
    
}
