import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators"
import { User } from "../auth/user.model";


interface AuthRespponse {
    idToken: string,
    email:string,
    kind:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}
@Injectable({providedIn:'root'})
export class AuthService{

    private userSubject = new Subject<User>();
    constructor(private http:HttpClient){}


    public signIn(data:{email:string,password:string}):Observable<AuthRespponse>{

        return this.http.post<AuthRespponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=key",
        {...data,returnSecureToken:true})
        .pipe(
            catchError(errorRes => {
            
                const ErrorMessage = this.catchErrorReturn(errorRes);
                return throwError(ErrorMessage);
            }),
            tap(dataRest=>{
                this.createUser(dataRest.email, dataRest.localId, dataRest.idToken, +dataRest.expiresIn);
            })
        );
        
    }


    public login(data:{email:string,password:string,returnSecureToken:boolean}):Observable<AuthRespponse>{
        return this.http.post<AuthRespponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=key",
        data)
        .pipe(
            catchError(errorRes=>{
                const ErrorMessage = this.catchErrorReturn(errorRes);
                return throwError(ErrorMessage);
            })
            ,
            tap(dataRest=>{
                this.createUser(dataRest.email, dataRest.localId, dataRest.idToken, +dataRest.expiresIn);
            })
        );
    }


    private createUser(userId:string, email:string, token:string, expirateIn:number){
        const expiratedDate = new Date( new Date().getTime() + expirateIn *1000);
        let user = new User(email, userId, token, expiratedDate);
        this.userSubject.next(user);
    }

    private catchErrorReturn(errorRes:any){
        let messageError = "An Error as Occured";
        if(!errorRes.error || !errorRes.error.error){
            return messageError
        }

        switch(errorRes.error.error.message){
            case "EMAIL_EXISTS":
                messageError = "L'adresse e-mail est déjà utilisée par un autre compte." ;
                break;
            case "EMAIL_NOT_FOUND":
                messageError = "Aucun enregistrement utilisateur ne correspond à cet identifiant. L'utilisateur a peut-être été supprimé." ;
                break;
            case "INVALID_PASSWORD":
                messageError = "Le mot de passe n'est pas valide ou l'utilisateur n'a pas de mot de passe" ;
                break;
            case "USER_DISABLED":
                messageError = "Le compte utilisateur a été désactivé par un administrateur. " ;
                break;

        }
        return  messageError;
    }
}