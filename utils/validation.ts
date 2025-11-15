const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
}

export function isValidName(name: string): boolean {
    return name.trim().length > 0;
}
