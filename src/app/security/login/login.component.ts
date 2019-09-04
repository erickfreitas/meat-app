import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms'
import { LoginService } from './login.service';
import { User } from './user.model';
import { NotificationService } from 'app/shared/messages/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private formBuilder: FormBuilder, 
              private loginService: LoginService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {debugger }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => 
                  this.notificationService.notify(`Bem vindo ${user.name}!`),
                response => //response é do tipo HttpErrorResponse
                  this.notificationService.notify(`Dados inválidos`),
                () => { this.router.navigate([atob(this.navigateTo)])})
  }

}
