import axios from "axios";

export const get = async <T>(path: string) => {
    return new Promise<T>((resolve, reject) => {
        var config: any = {
            method: 'get',
            url: `https://littleborn.myshopify.com/admin/api/2022-07/${path}.json`,
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_adminApiAccessToken || ""
            }
        };
    
        axios(config)
            .then(function (response: any) {
                resolve(response.data)
            })
            .catch(function (error: any) {
                reject(error)
            });
    })
}

export const post = async <T>(path: string, data: any) => {
    return new Promise<T>((resolve, reject) => {
        var config: any = {
            method: 'post',
            url: `https://littleborn.myshopify.com/admin/api/2022-07/${path}.json`,
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_adminApiAccessToken || "",
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        axios(config)
            .then(function (response: any) {
                resolve(response.data)
            })
            .catch(function (error: any) {
                reject(error)
            });
    })
}


