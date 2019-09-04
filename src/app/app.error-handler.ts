import { LoginService } from './security/login/login.service';
import { NotificationService } from 'app/shared/messages/notification.service';
import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{

    constructor(private notificationService: NotificationService,
                private injector: Injector, private zone: NgZone){
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any){        
        this.notificationService.notify('Error')
        if (errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.message;
            this.zone.run(() => {
            switch(errorResponse.status){
                case 401:
                    this.injector.get(LoginService).handleLogin()
                    break;
                case 403:
                    this.notificationService.notify(message || 'Não autorizado.')
                    break;    
                case 404:
                    this.notificationService.notify(message || 'Recurso não encontrado.')
                    break;
            }
        })
        }
        super.handleError(errorResponse)
    }
}