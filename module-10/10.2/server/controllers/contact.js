import validator from 'validator';

//validation for contact form values 
function validateValues({email, firstName, lastName}) {
    const emailValid = validator.isEmail(email);
    const firstNameValid = validator.isAlpha(firstName?.trim().replace('-', ''));
    const lastNameValid = validator.isAlpha(lastName?.trim().replace('-', ''));

    return emailValid && firstNameValid && lastNameValid;
}

//sanitizatyion function for user input from signup / contact forms
//replaces any non-alphanumeric characters with an empty string

const cleanStringRegex = new RegExp(`[^a-zA-Z0-9 '!\?,\.]`, 'gmi');
const sanitizeText = (str) => str.trim().replace(cleanStringRegex, '');

//sanitization function for human names. allows spaces, letters, periods, hyphens
//allow for Latin characters with diacritics
const cleanNameRegex = new RegExp(`[^a-zA-ZÀ-ÿ '.\-]`, 'gmi');
const sanitizeName = (str) => str.trim().replace(cleanNameRegex, '');

//handler for contact submit form
export async function handleSubmitContact({email, firsName, lastName, comments,}) {
    if (!email || !firsName || !lastName) {
        throw new Error('form values cannot be empty');
    }
    if (!validateValues({email, firsName, lastName})) {
        throw new Error('invalid form values');
    }
    
    try {
        email = email.trim().toLowerCase();
        firstName = sanitizeName(firstName);
        lastName = sanitizeName(lastName);
        comments = sanitizeText(comments);
    } catch (error) {
        throw new Error('error sanitizing form values');
    }
}