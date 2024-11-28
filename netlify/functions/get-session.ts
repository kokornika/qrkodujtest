import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

const handler: Handler = async (event) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe secret key is not configured' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { sessionId } = JSON.parse(event.body || '');

    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Session ID is required' }),
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        payment_intent: session.payment_intent,
        metadata: session.metadata,
      }),
    };
  } catch (error) {
    console.error('Error retrieving session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve session' }),
    };
  }
};

export { handler };