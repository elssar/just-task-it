import bcrypt from 'bcrypt';
import randomstring from 'randomstring';

const TOKEN_PATTERN = /^(?<pub>[a-zA-Z0-9]{8})-(?<priv>[a-zA-Z0-9]{40})$/;
const SALT_ROUNDS = 10;

async function generate () {
    let pub = await randomstring.generate(8);
    let priv = await randomstring.generate(40);
    let hash = await bcrypt.hash(priv, SALT_ROUNDS);

    return {
        public: pub,
        private: hash,
        token: `${pub}-${priv}`
    };
}

function is_valid (token) {
    let match = TOKEN_PATTERN.exec(token);

    if (match === null) {
        return { valid: false };
    }

    return {
        valid: true,
        public: match.groups.pub,
        private: match.groups.priv
    };
}

async function verify (token_private, hash) {
    let result = await bcrypt.compare(token_private, hash);

    return result;
}

export { generate, is_valid, verify };

