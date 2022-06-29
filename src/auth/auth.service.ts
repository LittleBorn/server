class AuthService{

    constructor(){}

    register(username:string, password:string){
        return new Promise((resolve, reject)=>{
            resolve('Register Successful');
        });
    }

    login(username:string, password:string){
        return new Promise((resolve, reject)=>{
            if(username==='admin' && password==='admin'){
                resolve('Login Successful');
            }else{
                reject('Login Failed');
            }
        });
    }

    logout(id:string){
        return new Promise((resolve, reject)=>{
            resolve('Logout Successful');
        });
    }

}

export default AuthService;