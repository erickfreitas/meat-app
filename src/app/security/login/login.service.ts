import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { MEAT_API } from "app/app.api";
import { User } from "./user.model";

@Injectable()
export class LoginService{

    constructor(private httpClient: HttpClient){

    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${MEAT_API}/login`, {email: email, password: password})
    }
}