import { loadEnvironment } from '../config/environment';
import { GitHubService } from './github-service';
import { EmailService } from './email-service';
import { StripeService } from './stripe-service';

const env = loadEnvironment();

export const services = {
  github: new GitHubService(env),
  email: new EmailService(env),
  stripe: new StripeService(env),
};