import { z } from 'zod';

const configSchema = z.object({
  github: z.object({
    token: z.string().min(1, 'GitHub token is required'),
    owner: z.string().min(1, 'GitHub owner is required'),
  }),
  email: z.object({
    serviceId: z.string().min(1, 'Email service ID is required'),
    templateId: z.string().min(1, 'Email template ID is required'),
    userId: z.string().min(1, 'Email user ID is required'),
  }),
});

type Config = z.infer<typeof configSchema>;

const loadConfig = (): Config => {
  const config = {
    github: {
      token: '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',
      owner: 'kokornika',
    },
    email: {
      serviceId: 'service_onlinenevjegy',
      templateId: 'template_digital_card_or',
      userId: 'nipVrr0rfc15-ddLW',
    },
  };

  try {
    return configSchema.parse(config);
  } catch (error) {
    console.error('Configuration error:', error);
    throw new Error('Invalid configuration. Please check your environment variables.');
  }
};

export const config = loadConfig();