import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser : UserToken = new UserToken();
  
  constructor(public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.accountService.currentUser$.forEach((user) => {
      if(user){
        this.currentUser = user
      }
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigate(['doctors']);
  }

  checkAdmin(){
    if(this.currentUser.role == 'ROLE_ADMIN') return true;
    return false;
  }

  checkDoctor(){
    if(this.currentUser.role == 'ROLE_DOCTOR') return true;
    return false;
  }

  checkPatient(){
    if(this.currentUser.role == 'ROLE_PATIENT') return true;
    return false;
  }

}
