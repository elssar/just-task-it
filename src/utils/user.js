import isEmail from 'validator/lib/isEmail.js';

function validate (user) {
    // Validate that user has an email property, and that it is a valid email
    if (typeof user.email !== 'string' || !isEmail(user.email)) {
        return false;
    }

    // Validate that user has a name property, which is a non empty string
    // This could use improvements, like ensuring that `name` isn't just empty
    // spaces and tabs.
    if (typeof user.name !== 'string' || user.name.length === 0) {
        return false;
    }

    // Validate that there are no extra properties in user
    if (Object.keys(user).length !== 2) {
        return false;
    }

    return true;
}

export { validate };

