import * as ping from "ping";

export const checkHostAvailabilty = (ip: string, timeout: number = 3): Promise<boolean> => {

    return new Promise<boolean>(async (res, rej) => {
        
        let rtn = await ping.promise.probe(ip, {timeout: timeout});
        res(rtn.alive)

    })

}