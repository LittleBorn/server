export const decodeShopifyId = (shopifyId: string): string => {
    var re = new RegExp("([0-9]+)");
    const match: RegExpExecArray = re.exec(shopifyId);
    if(match){
        return match[0]
    }else{
        return undefined
    }
}

export const encodeShopifyId = (id: string): string => `gid://shopify/Customer/${id}`;