// src/pages/ContactPage.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import {ContactFormData, contactFormSchema} from "../lib/zod-schemas.ts";

// Inline FormField component
interface FormFieldProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    label: string;
    register: UseFormRegister<TFormValues>;
    error?: FieldError;
    type?: string;
    placeholder?: string;
}

const FormField = <TFormValues extends FieldValues>({
                                                        name,
                                                        label,
                                                        register,
                                                        error,
                                                        type = 'text',
                                                        placeholder,
                                                    }: FormFieldProps<TFormValues>) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                {...register(name)}
                placeholder={placeholder}
                className={`
          w-full rounded-md border px-3 py-2
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
};

const ContactPage: React.FC = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema)
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form submitted:', data);
            setIsSuccess(true);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

            <div className="bg-white rounded-lg shadow p-6">
                {isSuccess && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                        Demande de contact envoyée avec succès
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <FormField<ContactFormData>
                        name="email"
                        label="Email"
                        type="email"
                        register={register}
                        error={errors.email}
                        placeholder="your.email@example.com"
                    />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            {...register('message')}
                            placeholder="Your message here..."
                            className={`
                                w-full rounded-md border px-3 py-2
                                ${errors.message ? 'border-red-500' : 'border-gray-300'}
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                            `}
                            rows={4}
                        />
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            w-full bg-blue-600 text-white py-2 rounded-md
                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
                        `}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;