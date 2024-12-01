import { z } from 'zod';

// Environment variable schema with optional values for development
const envSchema = z.object({
  github: z.object({
    token: z.string().optional().default(''),
    owner: z.string().optional().default(''),
  }),
  email: z.object({
    serviceId: z.string().optional().default(''),
    templateId: z.string().optional().default(''),
    userId: z.string().optional().default(''),
  }),
  stripe: z.object({
    publishableKey: z.string().optional().default(''),
  }),
});

// Parse and validate environment variables
const parseEnv = () => {
  const env = {
    github: {
      token: import.meta.env.VITE_GITHUB_TOKEN,
      owner: import.meta.env.VITE_GITHUB_OWNER,
    },
    email: {
      serviceId: import.meta.env.VITE_EMAIL_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      userId: import.meta.env.VITE_EMAIL_USER_ID,
    },
    stripe: {
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    },
  };

  const result = envSchema.safeParse(env);

  if (!result.success) {
    console.warn('Some environment variables are missing. Using default values for development.');
    return envSchema.parse(env);
  }

  return result.data;
};

export const env = parseEnv();

// Helper function to check if required variables are set
export const isConfigured = {
  github: () => Boolean(env.github.token && env.github.owner),
  email: () => Boolean(env.email.serviceId && env.email.templateId && env.email.userId),
  stripe: () => Boolean(env.stripe.publishableKey),
};