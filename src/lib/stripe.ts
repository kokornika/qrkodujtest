import { loadStripe } from '@stripe/stripe-js';
import { PaymentPlan } from './constants/plans';
import { stripeConfig } from './config/stripe';

const stripePromise = loadStripe(stripeConfig.publishableKey);

interface CustomerData {
  name: string;
  email: string;
  company?: string;
}

export async function createPaymentSession(customerData: CustomerData, plan: PaymentPlan) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('A fizetési szolgáltatás nem érhető el');

    // Create checkout session through Netlify function
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan,
        customerData,
      }),
    });

    if (!response.ok) {
      throw new Error('A fizetési munkamenet létrehozása sikertelen');
    }

    const session = await response.json();

    if (session.error) {
      throw new Error(session.error);
    }

    // Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Payment session creation failed:', error);
    throw error;
  }
}

export type { PaymentPlan };