import { LoginService } from './../../security/login/login.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/security/login/user.model';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  user(): User {
    return this.loginService.user
  }

  isLoggedIn(): boolean {
    return this.loginService.isLogged()
  }

  login() {
    this.loginService.handleLogin()
  }

  logout() {
    this.loginService.logout()
  }

}
