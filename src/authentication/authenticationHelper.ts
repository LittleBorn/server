import { NextFunction, Request, Response } from "express";
const { authenticate } = require("ldap-authentication");
import * as loggingHelper from "../utils/loggingHelper";
import * as dbHelper from "../db/JSONDatabaseProvider"

// Initials check in ldap system makes new AuthToken if true
export async function checkLDAPCredentials(username: string, password: string): Promise<string> {

  if (!username) return undefined;

  loggingHelper.log(loggingHelper.LoggingLevel.info, `User ${username} trying to log in...`);

  const requiredLDAPGroup = process.env.LDAP_GRP || "Gast-Internet-Sponsor";

  /* Berechnung */
  let authResult: boolean = false;

  /* sp36 -> SP36 */
  username = username.toUpperCase();

  // get access credentials
  let ldapUsername: string = "NetSight-RO"
  let ldapPassword: string = "4ro2arbad";

  const options = {
    ldapOpts: {
      url: "ldaps://winad03.lossburg.arburg.com:636",
      tlsOptions: { rejectUnauthorized: false }
    },
    adminDn: `CN=${ldapUsername},OU=Users,OU=Lossburg,OU=Germany,OU=ARBURG,DC=lossburg,DC=arburg,DC=com`,
    adminPassword: ldapPassword,
    userPassword: password,
    userSearchBase: "OU=Users,OU=Lossburg,OU=Germany,OU=ARBURG,DC=lossburg,DC=arburg,DC=com",
    usernameAttribute: "sAMAccountName",
    username,
  };

  let user;
  try {
    user = await authenticate(options);
    // set authResult -> True if user is in correct group
    const memberList: string[] = user.memberOf;
    //   console.log("LDAP Authenticated User:", user);
    if ((memberList.find((item) => item.search(requiredLDAPGroup) != -1)) != undefined) {
      authResult = true;
    }

  } catch (err) {
    console.log(err)
    return undefined;
  }

  // Sets new token if auth is successfull
  if (authResult) {

    return dbHelper.addNewToken(username);

    // Return undefined if auth is not successfull
  } else {
    return undefined;
  }
}

export function clearToken(token: string): boolean {

  const result: boolean = dbHelper.removeToken(token);

  if (result) {
    return true;
  } else {
    return false;
  }

}
