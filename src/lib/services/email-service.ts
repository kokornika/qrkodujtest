import emailjs from 'emailjs-com';
import { Environment } from '../config/environment';
import { VCardFormData } from '../../types/vcard';
import { generateOrderSummary } from '../website/order-summary';

export class EmailService {
  private serviceId: string;
  private userId: string;

  constructor(env: Environment) {
    this.serviceId = env.email.serviceId;
    this.userId = env.email.userId;
  }

  async sendCustomerEmail(
    data: VCardFormData,
    plan: { name: string; price: number; period: string },
    deployUrl: string,
    orderId: string
  ): Promise<void> {
    const templateParams = {
      to_name: data.name,
      to_email: data.email,
      customer_name: data.name,
      plan_name: plan.name,
      plan_price: `${plan.price.toLocaleString()} Ft`,
      plan_period: plan.period,
      order_id: orderId,
      deploy_url: deployUrl
    };

    await emailjs.send(
      this.serviceId,
      'template_email_ugyfelnek',
      templateParams,
      this.userId
    );
  }

  async sendAdminEmail(
    data: VCardFormData,
    plan: { name: string; price: number; period: string },
    repoUrl: string,
    deployUrl: string,
    orderId: string,
    sessionId: string
  ): Promise<void> {
    const templateParams = {
      to_name: 'Admin',
      to_email: 'kokornika@gmail.com',
      customer_name: data.name,
      customer_email: data.email,
      customer_phone: data.phoneMobile,
      customer_company: data.company,
      customer_position: data.position,
      plan_name: plan.name,
      plan_price: `${plan.price.toLocaleString()} Ft`,
      plan_period: plan.period,
      order_id: orderId,
      stripe_session_id: sessionId,
      repo_url: repoUrl,
      deploy_url: deployUrl,
      order_summary: generateOrderSummary(data)
    };

    await emailjs.send(
      this.serviceId,
      'template_digital_card_or',
      templateParams,
      this.userId
    );
  }
}