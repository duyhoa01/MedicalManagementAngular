import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,
              private accountService: AccountService) { }

  public isAuthenticated(): boolean {
    let token: string | undefined = undefined;
    this.accountService.currentUser$.subscribe(
      (userToken) => (token = userToken?.access_token)
    )
    return !this.jwtHelper.isTokenExpired(token);
  }

}
