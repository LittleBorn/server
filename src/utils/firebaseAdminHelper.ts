import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth"

const app = initializeApp({
  credential: applicationDefault()
}, "ADMIN_APP");


const adminAuth = getAuth(app);

export {
    adminAuth
}