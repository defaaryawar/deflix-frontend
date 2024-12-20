// components/Validation/ValidationEmail.js

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const getEmailError = (email, text, bahasa) => {
    if (!email) {
        return text[bahasa].ValidateEmail; // Menyesuaikan dengan pesan bahasa
    }
    if (!validateEmail(email)) {
        return text[bahasa].ValidateEmail1; // Menyesuaikan dengan pesan bahasa
    }
    return null;
};
