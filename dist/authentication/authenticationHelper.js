"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearToken = exports.checkLDAPCredentials = void 0;
const { authenticate } = require("ldap-authentication");
// Initials check in ldap system makes new AuthToken if true
async function checkLDAPCredentials(username, password) {
    return new Promise((resolve, reject) => {
        resolve("true");
    });
}
exports.checkLDAPCredentials = checkLDAPCredentials;
function clearToken(token) {
    return true;
}
exports.clearToken = clearToken;
//# sourceMappingURL=authenticationHelper.js.map