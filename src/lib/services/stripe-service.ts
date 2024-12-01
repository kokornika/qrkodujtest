import { loadStripe } from '@stripe/stripe-js';
import { Environment } from '../config/environment';
import { CustomerData, PaymentPlan } from '../../types/payment';

export class StripeService {
  private publishableKey: string;
  private stripePromise: Promise<any>;

  constructor(env: Environment) {
    this.publishableKey = env.stripe.publishableKey;
    this.stripePromise = loadStripe(this.publishableKey);
  }

  async createCheckoutSession(customerData: CustomerData, plan: PaymentPlan) {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

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
      const error = await response.json();
      throw new Error(error.message || 'A fizetési munkamenet létrehozása sikertelen');
    }

    const session = await response.json();
    return stripe.redirectToCheckout({ sessionId: session.id });
  }
}