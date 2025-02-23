import { z } from 'zod';

export const contactFormSchema = z.object({
    email: z.string().email('Invalid email'),
    message: z.string()
        .min(1, 'Message is required')
        .max(300, 'Message too long')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;