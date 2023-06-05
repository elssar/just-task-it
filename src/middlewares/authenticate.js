/**
 * A middleware for authenticating requests.
 *
 * A request is authenticated if
 *  - it has a access token present in the X-Api-Key header
 *  - the token format is valid
 *  - the token is present in the database
 * 
 * If the request is authenticated, then the user id will be added to req.user_id.
 *
 * NOTE:
 * This middleware only "authenticates" requests. It does not perform authorization.
 * Authorization is the responsibility of the individual controllers
 */
import Token from '../models/token.model.js';
import { Unauthorized } from '../errors.js';
import { is_valid, verify } from '../utils/token.js';

async function authenticate (req, res, next) {
    let api_key = req.get('X-Api-Key');

    let validation = is_valid(api_key);

    if (!validation.valid) {
        return next(new Unauthorized());
    }

    let token = await Token.findOne({ where: { public: validation.public }});

    if (token === null) {
        return next(new Unauthorized());
    }

    let match = await verify(validation.private, token.private);

    if (!match) {
        return next(new Unauthorized());
    }

    req.user_id = token.user;

    return next(null, req, res);
}

export default authenticate;

