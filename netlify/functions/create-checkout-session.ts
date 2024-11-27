import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { plan, customerData } = JSON.parse(event.body || '');

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
      success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/cancel`,
      customer_email: customerData.email,
      metadata: {
        customerName: customerData.name,
        customerCompany: customerData.company || '',
        planId: plan.id,
        planPeriod: plan.period,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };