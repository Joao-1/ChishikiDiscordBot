export = function getEnv() {
    let env;
    console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV?.trim()) {
        case 'dev':
            env = '.env.dev';
            break;
        case 'test':
            env = '.env.test';
            break;
        case 'production':
            env = '.env';
            break;
        default:
            throw new Error('Environment variables not provided');
    }
    return env;
};
