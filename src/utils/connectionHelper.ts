import * as https from "https";

// At request level
export const agent = new https.Agent({
    rejectUnauthorized: false,
  });


