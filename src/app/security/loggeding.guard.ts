import { CanLoad, Route } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad{

    constructor(private loginService: LoginService){

    }

    canLoad(route: Route): boolean{
        const isLogged: boolean = this.loginService.isLogged()
        if(!isLogged){
            debugger    
            this.loginService.handleLogin(`/${route.path}`)
        }
        return isLogged
    }

}