import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    public accountService: AccountService,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  

  ngOnInit(): void {
    this.accountService.reLogin();
  }
  title = 'MedicalManagementAngular';
}
