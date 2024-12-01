import { loadStripe, Stripe } from '@stripe/stripe-js';
import { env, isConfigured } from './config/env';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!isConfigured.stripe()) {
    console.warn('Stripe is not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY in your environment.');
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(env.stripe.publishableKey);
  }
  return stripePromise;
};

interface CustomerData {
  name: string;
  email: string;
  company?: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  comparisonPoints: string[];
}

export async function createPaymentSession(customerData: CustomerData, plan: PaymentPlan) {
  try {
    if (!isConfigured.stripe()) {
      throw new Error('Stripe is not configured. Payment features are disabled.');
    }

    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe failed to initialize');

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