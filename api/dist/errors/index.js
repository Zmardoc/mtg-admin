"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingOcrImage = exports.notLoggedIn = exports.tokenMissing = exports.userAlreadyExists = exports.loginFailed = exports.missingSecretEnv = exports.getOcrError = exports.getUnknownError = exports.setError = exports.isError = void 0;
const tokenMissing = {
    status: 401,
    code: 'MISSING_TOKEN',
    details: 'JWT token missing',
};
exports.tokenMissing = tokenMissing;
const loginFailed = {
    status: 401,
    code: 'LOGIN_FAILED',
    details: 'Login failed',
};
exports.loginFailed = loginFailed;
const notLoggedIn = {
    status: 401,
    code: 'NOT_LOGGED_IN',
    details: 'User not logged in',
};
exports.notLoggedIn = notLoggedIn;
const userAlreadyExists = {
    status: 409,
    code: 'USER_ALERADY_EXISTS',
    details: 'User already exists',
};
exports.userAlreadyExists = userAlreadyExists;
const missingSecretEnv = {
    status: 500,
    code: 'MISSING_SECRET_KEY_ENV',
    details: 'Env secret key missing',
};
exports.missingSecretEnv = missingSecretEnv;
const missingOcrImage = {
    status: 400,
    code: 'MISSING_OCR_IMAGE',
    details: 'Missing OCR image',
};
exports.missingOcrImage = missingOcrImage;
function getOcrError(error) {
    return {
        status: 500,
        code: 'ocr_server_error',
        details: 'Something went wrong on my poor, poor server when calling ocr api.',
        stack: error,
    };
}
exports.getOcrError = getOcrError;
function getUnknownError(error) {
    return {
        status: 500,
        code: 'UNKNOWN_ERROR',
        details: 'Unknown error',
        stack: error,
    };
}
exports.getUnknownError = getUnknownError;
function setError(res, error) {
    res.status(error.status).json(error);
}
exports.setError = setError;
function isError(error) {
    return !!(typeof error === 'object' && error && 'status' in error);
}
exports.isError = isError;
//# sourceMappingURL=index.js.map