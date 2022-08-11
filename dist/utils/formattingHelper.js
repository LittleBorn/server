"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeShopifyId = exports.decodeShopifyId = void 0;
exports.decodeShopifyId = (shopifyId) => {
    var re = new RegExp("([0-9]+)");
    const match = re.exec(shopifyId);
    if (match) {
        return match[0];
    }
    else {
        return undefined;
    }
};
exports.encodeShopifyId = (id) => `gid://shopify/Customer/${id}`;
//# sourceMappingURL=formattingHelper.js.map