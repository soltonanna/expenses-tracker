// Regular expressions
export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const USER_INSTRUCTIONS = "Username must start with a letter, be between 4 and 24 characters, and can only contain letters, numbers, hyphens, and underscores.";
export const USER_ERROR_MESSAGE = "Invalid username. " + USER_INSTRUCTIONS;


export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const PWD_INSTRUCTIONS = "Password must be 8 to 24 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%).";
export const PWD_ERROR_MESSAGE = "Invalid password. " + PWD_INSTRUCTIONS;


export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
export const EMAIL_INSTRUCTIONS = "Please enter a valid email address.";
export const EMAIL_ERROR_MESSAGE = "Invalid email address. " + EMAIL_INSTRUCTIONS;


export const SUBMIT_ERROR_INSTRUCTIONS = "Please check login and password again.";
export const SUBMIT_ERROR_MESSAGE = 'Invalid Entry!' + SUBMIT_ERROR_INSTRUCTIONS;