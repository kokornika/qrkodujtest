import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

const handler: Handler = async (event) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY environment variable');
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Configuration error',
        message: 'Stripe secret key is not configured'
      }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { plan, customerData } = JSON.parse(event.body || '');

    if (!plan || !customerData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Invalid request',
          message: 'Missing plan or customer data'
        }),
      };
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'huf',
            product_data: {
              name: plan.name,
              description: `Digitális névjegykártya - ${plan.period}`,
            },
            unit_amount: plan.price * 100, // Convert to smallest currency unit (fillér)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'http://localhost:5173'}/cancel`,
      customer_email: customerData.email,
      metadata: {
        customerName: customerData.name,
        customerCompany: customerData.company || '',
        planId: plan.id,
        planPeriod: plan.period,
      },
    });

    // After successful session creation, get the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);
    const repoName = `digital-card-${paymentIntent.id}`;

    // Update session metadata with repo information
    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...session.metadata,
        repoName: repoName,
        deployUrl: `https://${repoName}.netlify.app`
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        id: session.id,
        paymentIntentId: paymentIntent.id,
        repoName: repoName
      }),
    };
  } catch (error) {
    console.error('Stripe session creation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Payment session creation failed',
        message: errorMessage
      }),
    };
  }
};

export { handler };