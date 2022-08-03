"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendStorefrontQuery = void 0;
const axios_1 = require("axios");
exports.sendStorefrontQuery = (data) => {
    // todo umsteigen auf admin api
    var config = {
        method: 'post',
        url: 'https://littleborn.myshopify.com/api/2022-07/graphql.json',
        headers: {
            'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_TOKEN || "28869d2b1c2ac7dbd3998dfed945cd2a",
            'Content-Type': 'application/json'
        },
        data: data
    };
    return new Promise((resolve, reject) => {
        axios_1.default(config)
            .then(function (response) {
            resolve(response.data);
        })
            .catch(function (error) {
            reject(error);
        });
    });
};
//# sourceMappingURL=shopifyStorefrontHelper.js.map