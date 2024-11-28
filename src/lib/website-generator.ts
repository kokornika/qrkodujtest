import { VCardFormData } from '../types/vcard';
import emailjs from 'emailjs-com';
import { generateOrderSummary } from './website/order-summary';
import { GitHubRepository } from './github';
import { config } from './config';

export class WebsiteGenerator {
  private github: GitHubRepository;

  constructor() {
    this.github = new GitHubRepository();
  }

  async sendWebsiteCode(
    data: VCardFormData, 
    plan?: { name: string; price: number; period: string },
    orderId?: string,
    sessionId?: string
  ): Promise<void> {
    try {
      if (!data.email) {
        throw new Error('Email address is required');
      }

      if (!data.name) {
        throw new Error('Name is required');
      }

      // Create GitHub repository and deploy to Netlify
      const { repoUrl, deployUrl } = await this.github.createRepository(data, orderId);
      
      // Send order details email
      await this.sendOrderDetails(data, plan, repoUrl, orderId, deployUrl, sessionId);
    } catch (error) {
      console.error('Error processing order:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to process order');
    }
  }

  private async sendOrderDetails(
    data: VCardFormData, 
    plan?: { name: string; price: number; period: string },
    repoUrl?: string,
    orderId?: string,
    deployUrl?: string,
    sessionId?: string
  ): Promise<void> {    
    try {
      const templateParams = {
        to_name: 'Admin',
        to_email: 'kokornika@gmail.com',
        customer_name: data.name || 'Névtelen megrendelő',
        customer_email: data.email,
        customer_phone: data.phoneMobile,
        customer_company: data.company,
        customer_position: data.position,
        plan_name: plan?.name || 'Alap csomag',
        plan_price: plan?.price ? `${plan.price.toLocaleString()} Ft` : '500 Ft',
        plan_period: plan?.period || '3 hónap',
        order_id: orderId || 'N/A',
        stripe_session_id: sessionId || 'N/A',
        repo_url: repoUrl || 'Nem sikerült létrehozni',
        deploy_url: deployUrl || 'Nem sikerült deployolni',
        order_summary: generateOrderSummary(data)
      };

      const response = await emailjs.send(
        config.email.serviceId,
        config.email.templateId,
        templateParams,
        config.email.userId
      );

      if (!response || response.status !== 200) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending order details:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to send order confirmation email');
    }
  }
}