import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate{

    constructor(private loginService: LoginService){

    }

    checkAuthentication(path: string): boolean{
        const isLogged: boolean = this.loginService.isLogged()
        if (!isLogged){
            this.loginService.handleLogin(`/${path}`)
        }
        return isLogged
    }

    canLoad(route: Route): boolean{
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }

}