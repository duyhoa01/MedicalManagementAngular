import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router,public accountService:AccountService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    console.log("role"+ expectedRole)
    let token: string | undefined = undefined;
    this.accountService.currentUser$.subscribe(
      (userToken) => (token = userToken?.access_token)
    )
    if(token){
      const tokenPayload :any = decode(token);
      try{
        console.log(tokenPayload.roles)
        console.log(tokenPayload.roles.includes(expectedRole))
        console.log(this.auth.isAuthenticated());
        if (
          this.auth.isAuthenticated() && 
          tokenPayload.roles.includes(expectedRole)
        ) {
          return true;
        } else{
          this.router.navigate(['login']);
          return false;
        }
      } catch(e){
        return false;
      }
    }
    // decode the token to get its payload
    this.router.navigate(['login']);
    return false;
  }
}
