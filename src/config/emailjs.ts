// EmailJS Configuration
// Get these values from https://dashboard.emailjs.com/

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_zu5xdwz',  // Will be provided from EmailJS dashboard
  TEMPLATE_ID: 'template_3s0w7o9', // Will be provided from EmailJS dashboard
  PUBLIC_KEY: 'TK1-w3bQvv7O8462F',   // Will be provided from EmailJS dashboard
  
  // Email to receive messages
  RECIPIENT_EMAIL: 'bol76335@gmail.com',
};

// Template variables that will be sent
export interface EmailTemplate {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_email: string;
}
