import { WaitlistFormData, WaitlistValidationError } from "@/types/waitlist";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWaitlistForm(
    formData: WaitlistFormData
): WaitlistValidationError | null {
    if (!formData.name.trim()) {
        return {
            field: 'name',
            message: 'Please enter your full name',
        };
    }

    if (!EMAIL_REGEX.test(formData.email)) {
        return {
            field: 'email',
            message: 'Please enter a valid email address',
        };
    }

    return null;
}

export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
}

export function isValidName(name: string): boolean {
    return name.trim().length > 0;
}
