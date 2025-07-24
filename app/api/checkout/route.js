import Stripe from "stripe";

// Try both environment variable approaches for compatibility
const API_KEY = process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

export async function POST(request) {
    try {
        console.log('=== CHECKOUT DEBUG ===');
        console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
        console.log('NEXT_PUBLIC_STRIPE_SECRET_KEY exists:', !!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
        console.log('Using API Key starts with:', API_KEY ? API_KEY.substring(0, 7) + '...' : 'undefined');
        console.log('Environment:', process.env.NODE_ENV);

        // Check if API key exists
        if (!API_KEY) {
            console.error('No Stripe API key found in environment variables');
            return Response.json(
                { 
                    error: 'Stripe not configured',
                    debug: {
                        hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
                        hasNextPublicStripeKey: !!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
                        environment: process.env.NODE_ENV
                    }
                }, 
                { status: 500 }
            );
        }

        // Initialize Stripe
        const stripe = new Stripe(API_KEY, {
            apiVersion: '2023-10-16',
        });

        const { lineItems } = await request.json();
        console.log('Received line items:', lineItems);

        // Validate lineItems
        if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
            console.error('Invalid line items received');
            return Response.json(
                { error: 'Invalid line items provided' }, 
                { status: 400 }
            );
        }

        console.log('Creating Stripe checkout session...');
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: lineItems,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`
        });

        console.log('Stripe session created successfully:', session.id);
        return Response.json({ 
            url: session.url, 
            sessionId: session.id 
        });

    } catch (err) {
        console.error('=== CHECKOUT ERROR ===');
        console.error('Error message:', err.message);
        console.error('Error type:', err.type);
        console.error('Error code:', err.code);
        console.error('=== END ERROR ===');

        return Response.json(
            { 
                error: 'Failed to create checkout session',
                details: err.message,
                type: err.type,
                code: err.code
            }, 
            { status: 500 }
        );
    }
}
