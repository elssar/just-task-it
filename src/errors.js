/**
 * This file defines custom errors for the application.
 *
 * Each error will have a custom name and response code which wiil be used by the error handler
 * to send the appropriate response back to the client.
 */

class UnexpectedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnexpectedError';
        this.status_code = 500;
    }
}

class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthorized';
        this.status_code = 401;
    }
}

class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequest';
        this.status_code = 400;
    }
}

class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
        this.status_code = 404;
    }
}

export { UnexpectedError, Unauthorized, BadRequest, NotFound };

