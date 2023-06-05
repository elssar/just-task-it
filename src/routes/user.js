import Router from 'express';

import User from '../models/user.model.js';
import Token from '../models/token.model.js';

import authenticate from '../middlewares/authenticate.js';

import { BadRequest, UnexpectedError } from '../errors.js';

import { validate as validate_req } from '../utils/user.js';
import { generate as generate_token } from '../utils/token.js';

const user_router = Router();

/**
 * Create a user.
 *
 * If the request data passes validation, then create a user and a token for the user.
 *
 * Problems / Improvements:
 * - Currently, errors from the database and from utils are handled but not in a user friendly manner.
 * - The creation of a user and a token are not wrapped in a single transaction so it is possible for
 *   a user without a token to be created.
 * - Generation of unique tokens could be done
 */
user_router.post('/', async (req, res, next) => {
    let data = req.body;

    // Return BadRequest is request data is not valid
    if (!validate_req(data)) {
        return next(new BadRequest());
    }

    try {
        let user = await User.create(data);
        let token_data = await generate_token();
        
        await Token.create({
            user: user.id,
            public: token_data.public,
            private: token_data.private
        });

        return res.json({
            token: token_data.token
        });
    }
    catch (err) {
        return next(err);
    }
});

/**
 * Return the authenticated user
 *
 * This route assumes that the reuqest has been authenticated by the `authenticate` middleware
 * and expected `user_id` to be present in the req object. It uses this `user_id` to fetch
 * the authenticated users details from the database.
 */
user_router.get('/', authenticate, async (req, res, next) => {
    try {
        let user = await User.findByPk(req.user_id);

        // This should not happen
        // If it does, then something went really wrong
        // as we have a valid token for a non-exitent user
        if (user === null) {
            return next(new UnexpectedError());
        }

        return res.json({
            email: user.email,
            name: user.name
        });
    }
    catch (err) {
        return next(err);
    }
});

export default user_router;

