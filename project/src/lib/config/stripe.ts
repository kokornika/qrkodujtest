import { z } from 'zod';

const stripeConfigSchema = z.object({
  publishableKey: z.string().min(1, 'Stripe publishable key is required'),
});

const loadStripeConfig = () => {
  const config = {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51QPpEhGPvnEUA2fs4kv8cPm7mjAfcvoeIQAIPtTLpXo3lcGG5XygaFZxld8DJxncBKX8eqGQrWJ25CuhNwq2TtvS00bRBM46vs',
  };

  return stripeConfigSchema.parse(config);
};

export const stripeConfig = loadStripeConfig();