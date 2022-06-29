"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    constructor() { }
    register(username, password) {
        return new Promise((resolve, reject) => {
            resolve('Register Successful');
        });
    }
    login(username, password) {
        return new Promise((resolve, reject) => {
            if (username === 'admin' && password === 'admin') {
                resolve('Login Successful');
            }
            else {
                reject('Login Failed');
            }
        });
    }
    logout(id) {
        return new Promise((resolve, reject) => {
            resolve('Logout Successful');
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map