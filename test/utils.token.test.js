import { expect } from 'chai';

import { generate, is_valid } from '../src/utils/token.js';

describe('Token utils', () => {
    describe('generate method', () => {
        it('should generate a valid token', async () => {
            let result = await generate();

            expect(result)
                .to.be.an('object')
                .which.has.all.keys('public', 'private', 'token');

            expect(result)
                .to.have.property('public')
                .which.is.a('string')
                .that.matches(/^[a-zA-Z-0-9]{8}$/);

            expect(result)
                .to.have.property('private')
                .which.is.a('string');

            expect(result)
                .to.have.property('token')
                .which.is.a('string')
                .that.matches(/^(?<pub>[a-zA-Z0-9]{8})-(?<priv>[a-zA-Z0-9]{40})$/);
        });
    });

    describe('is_valid method', () => {
        it('should return true for a well formed token', () => {
            const WELL_FORMED_TOKEN = 'SJXFgCxa-LsHS5buPo5BGYMYFxIwOcZXBZ7ZzEnWkPMypVhro';
            const TOKEN_PARTS = WELL_FORMED_TOKEN.split('-');

            let iv = is_valid(WELL_FORMED_TOKEN);

            expect(iv)
                .to.be.an('object')
                .which.has.all.keys('valid', 'public', 'private');

            expect(iv)
                .to.have.property('valid')
                .to.be.true;

            expect(iv)
                .to.have.property('public')
                .which.is.a('string')
                .to.equal(TOKEN_PARTS[0]);

            expect(iv)
                .to.have.property('private')
                .which.is.a('string')
                .to.equal(TOKEN_PARTS[1]);
        });

        it('should return false for an invalid token', () => {
            const INVALID_TOKEN = 'KVRzzPlnwLPezfbfnkwkPy6a5Q7U5lYhXr8ozKta8aoMjVxGC';

            let result = is_valid(INVALID_TOKEN);

            expect(result)
                .to.be.an('object')
                .which.has.all.keys('valid')
                .to.have.property('valid')
                .to.be.false;
        });
    });
});

