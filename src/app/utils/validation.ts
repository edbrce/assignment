export const validateTextField = (text: string) => {
    const textRegex = new RegExp(/^[a-zA-Z 0-9.,!?'\-(\r?\n)]{1,500}$/);
    return validate(text, textRegex);
};

export const validateEmailField = (email: string) => {
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/);
    return validate(email, emailRegex);
};

export const validatePasswordField = (password: string) => {
    // A number, lowercase letter, uppercase letter, special character, no space and between 8-16 characters long
    const passwordRegex = new RegExp(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    );
    return validate(password, passwordRegex);
};

const validate = (text: string, regex: RegExp) => {
    return !!text.match(regex);
};
