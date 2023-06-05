import { expect } from 'chai';

import { validate } from '../src/utils/user.js';

describe('User utils', () => {
    describe('validate function ', () => {
        it('returns false for a user with invalid email', () => {
            let user = {
                email: 'jti',
                name: 'akshay'
            };

            expect(validate(user)).to.be.false;
        });

        it('returns false for a user with an invalid name', () => {
            let user = {
                email: 'akshay@jti.com',
                name: ''
            };

            expect(validate(user)).to.be.false;
        });

        it('returns false for a user with no email', () => {
            let user = { name: 'akshay' };

            expect(validate(user)).to.be.false;
        });

        it('returns false for a user with no name', () => {
            let user = { email: 'akshay@jti.com' };

            expect(validate(user)).to.be.false;
        });

        it('returns false for a user with no email and no name', () => {
            let user = {};

            expect(validate(user)).to.be.false;
        });

        it('returns false for a user with extra properties', () => {
            let user = {
                email: 'akshay@jti.com',
                name: 'akshay',
                website: 'jti.com'
            };

            expect(validate(user)).to.be.false;
        });

        it('returns true for a valid user', () => {
            let user = {
                email: 'akshay@jti.com',
                name: 'akshay'
            };

            expect(validate(user)).to.be.true;
        });
    });
});

