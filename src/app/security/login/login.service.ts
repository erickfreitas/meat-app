import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { MEAT_API } from "app/app.api";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable()
export class LoginService{
    
    user: User

    constructor(private httpClient: HttpClient, private router: Router){
        // tslint:disable-next-line: no-trailing-whitespace
        
    }

    isLogged(): boolean{
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${MEAT_API}/login`, 
                                    {email: email, password: password})
                                    .do(user => this.user = user)
                                    .do(user => console.log(this))

    }

    handleLogin(path: string){
        this.router.navigate(['/login', btoa(path)])
    }
}