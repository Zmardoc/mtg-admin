"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.loginCheck = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../database/users");
const configEnv_1 = require("../config/configEnv");
const errors_1 = require("../errors");
async function login(req, res) {
    if (!configEnv_1.secretKey) {
        (0, errors_1.setError)(res, errors_1.missingSecretEnv);
        return;
    }
    const { username, password } = req.body;
    const user = await (0, users_1.findUser)(username);
    if (!user) {
        (0, errors_1.setError)(res, errors_1.loginFailed);
        return;
    }
    const passwordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        (0, errors_1.setError)(res, errors_1.loginFailed);
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, configEnv_1.secretKey, {
        expiresIn: '1h',
    });
    res.json({ token, user });
}
exports.login = login;
function loginCheck(res) {
    res.status(200).json({ message: 'Login successful' });
}
exports.loginCheck = loginCheck;
async function register(req, res) {
    if (!configEnv_1.secretKey) {
        (0, errors_1.setError)(res, errors_1.missingSecretEnv);
        return;
    }
    const { username, password } = req.body;
    const existingUser = await (0, users_1.findUser)(username);
    if (existingUser) {
        (0, errors_1.setError)(res, errors_1.userAlreadyExists);
        return;
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    const id = await (0, users_1.insertUser)(newUser);
    // Vytvoření JWT tokenu pro nově registrovaného uživatele
    const token = jsonwebtoken_1.default.sign({ id, username: newUser.username }, configEnv_1.secretKey, {
        expiresIn: '1h',
    });
    res.status(201).json({ token });
}
exports.register = register;
//# sourceMappingURL=authorizationService.js.map