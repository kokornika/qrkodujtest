import { loadStripe } from '@stripe/stripe-js';
import { CustomerData } from '../../types/payment';
import { PaymentPlan } from '../constants/plans';

class StripeService {
  private publishableKey: string;
  private stripePromise: Promise<any>;

  constructor() {
    this.publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
    this.stripePromise = this.initializeStripe();
  }

  private initializeStripe() {
    if (!this.publishableKey) {
      console.error('Stripe publishable key is not configured');
      return Promise.resolve(null);
    }
    return loadStripe(this.publishableKey);
  }

  async createPaymentSession(customerData: CustomerData, plan: PaymentPlan) {
    try {
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
        throw new Error(error.message || 'Failed to create payment session');
      }

      const session = await response.json();
      
      if (!session.id) {
        throw new Error('Invalid session response');
      }

      return {
        id: session.id,
        url: `https://checkout.stripe.com/pay/${session.id}`
      };
    } catch (error) {
      console.error('Payment session creation error:', error);
      throw error;
    }
  }

  async getSession(sessionId: string) {
    try {
      const response = await fetch(`/.netlify/functions/get-session?session_id=${sessionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to retrieve session');
      }

      return response.json();
    } catch (error) {
      console.error('Error retrieving session:', error);
      throw error;
    }
  }
}

export const stripeService = new StripeService();

export const createPaymentSession = (customerData: CustomerData, plan: PaymentPlan) => {
  return stripeService.createPaymentSession(customerData, plan);
};

export const getSession = (sessionId: string) => {
  return stripeService.getSession(sessionId);
};