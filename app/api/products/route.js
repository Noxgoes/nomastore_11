import Stripe from 'stripe';

import  '../../../envConfig.js';
const API_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(API_KEY);

export async function GET(){
    try{
        const products = await stripe.products.list({active: true});
        const prices = await stripe.prices.list({active: true});
        const combinedData = products.data.map((product )=> { 
            const productPrices=prices.data.filter((price)=>{
                return price.product === product.id;
            });
            return { //ye return is for combining product and prices
                ...product,
                prices: productPrices.map((price) => ({
                    id: price.id,       
                    unit_amount: price.unit_amount,
                    currency: price.currency,   
                    recurring: price.recurring,
                })),
            } 
        })
        return Response.json(combinedData, {status: 200});

    }
    catch (err) {
        console.error("Error fetching data from stripes:", err.message);
        return Response.json({error: "Failed to fetch data from Stripe"}, {status: 500});}
}
