import { VCardFormData } from '../../types/vcard';
import { PaymentPlan } from '../stripe';
import { createPaymentSession } from '../stripe';
import { validateOrderData } from '../validation/order-validation';
import { OrderError } from '../errors/order-errors';

export async function processOrder(formData: VCardFormData, plan: PaymentPlan) {
  try {
    // Validate order data
    validateOrderData(formData);

    // Create payment session
    await createPaymentSession({
      name: formData.name,
      email: formData.email,
      company: formData.company,
    }, plan);

  } catch (error) {
    if (error instanceof Error) {
      throw new OrderError(error.message);
    }
    throw new OrderError('Váratlan hiba történt a megrendelés során');
  }
}