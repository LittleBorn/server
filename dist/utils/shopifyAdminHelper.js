"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
const axios_1 = require("axios");
exports.get = async (path) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://littleborn.myshopify.com/admin/api/2022-07/${path}.json`,
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_adminApiAccessToken
            }
        };
        axios_1.default(config)
            .then(function (response) {
            resolve(response.data);
        })
            .catch(function (error) {
            reject(error);
        });
    });
};
exports.post = async (path, data) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'post',
            url: `https://littleborn.myshopify.com/admin/api/2022-07/${path}.json`,
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_adminApiAccessToken,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios_1.default(config)
            .then(function (response) {
            resolve(response.data);
        })
            .catch(function (error) {
            reject(error);
        });
    });
};
//# sourceMappingURL=shopifyAdminHelper.js.map