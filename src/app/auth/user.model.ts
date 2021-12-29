export class User {
    constructor(public email:string, public userId:string, private _token:string, private _expireToken:Date){}

    get token(){
        if(!this._expireToken|| new Date() > this._expireToken){
            return null
        }
        return this._token;
    }
}