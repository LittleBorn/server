"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailVerification = exports.createUserWithEmailAndPassword = exports.auth = void 0;
// https://firebase.google.com/docs/web/setup#available-libraries
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
Object.defineProperty(exports, "createUserWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.createUserWithEmailAndPassword; } });
Object.defineProperty(exports, "sendEmailVerification", { enumerable: true, get: function () { return auth_1.sendEmailVerification; } });
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_apiKey,
    authDomain: process.env.FIREBASE_authDomain,
    projectId: process.env.FIREBASE_projectId,
    storageBucket: process.env.FIREBASE_storageBucket,
    messagingSenderId: process.env.FIREBASE_messagingSenderId,
    appId: process.env.FIREBASE_appId,
};
// Initialize Firebase
const app = app_1.initializeApp(firebaseConfig);
const auth = auth_1.getAuth(app);
exports.auth = auth;
//# sourceMappingURL=firebaseHelper.js.map