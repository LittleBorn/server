import { agent } from "../utils/connectionHelper";
var axios = require('axios');
import * as qs from "qs"
import { iacdto } from "interfaces/iacdto.interface";
import * as LoggingHelper from "../utils/loggingHelper";

class GuestModel {
  constructor() {
    this.username = "api_guestwifimanage";
    this.password = "oHQPoakPyZ7ujbQKtWCRzKw3zrRwwHkv"
  }

  private username: string;
  private password: string;

  async addUserToIAC(guest: any): Promise<iacdto | undefined>{

    let desc: string = Object.keys(guest).map(objKey => {return `${objKey}:${guest[objKey]}`;}).join(';')

    var data = qs.stringify({
     'username': this.username,
     'password': this.password,
     'action': 'create',
     'subaction': 'create_ticket',
     'use_template': '279',
     'expiration': guest.duration,
     'return_userdata': '1',
     'description': desc
     });

    return new Promise<iacdto | undefined>((res, rej) => {

       var config = {
         method: 'post',
         url: 'https://172.25.7.2/batch.php',
         headers: { 
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         httpsAgent: agent,
         data : data
       };

       /**
        * Example Return: 
        * {"error":0,"data":{"ticket_id":"25","username":"arbguest111","password":"f5xugezn"}}
        * Example Error:
        * Returns nothing with Status Code 200
        */
       
       axios(config)
       .then(function (response:any) {
          res(response.data)
       })
       .catch(function (error:any) {
         const msg: string = "Error occured while adding User to IAC-Box. The IAC-Box is probably not reachable anymore. (Timeout)";
         LoggingHelper.log(LoggingHelper.LoggingLevel.error, msg);
         console.log(msg);
         res(undefined)
       });
    });
  }

}

export default GuestModel;
