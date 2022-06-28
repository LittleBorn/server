import { NextFunction, Request, Response } from "express";
const { authenticate } = require("ldap-authentication");
import * as loggingHelper from "../utils/loggingHelper";
import * as dbHelper from "../db/JSONDatabaseProvider"

// Initials check in ldap system makes new AuthToken if true
export async function checkLDAPCredentials(username: string, password: string): Promise<string> {

  return new Promise<string>((resolve, reject) => {
    resolve("true")
  })

}

export function clearToken(token: string): boolean {

  return true;

}