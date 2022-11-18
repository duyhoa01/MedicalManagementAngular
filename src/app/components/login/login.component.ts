import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/models/app-user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authUser: AuthUser = {email:'', password:''}

  constructor(public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
  }


  login(){
    this.accountService.login(this.authUser)
    .subscribe(response => {
                alert("đăng nhập thành công")
                this.router.navigate(['doctors']);
              },
               error => alert("email hoặc password không đúng")
               );
  }

}
