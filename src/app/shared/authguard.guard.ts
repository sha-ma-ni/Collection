import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthguardGuard {

  constructor(    private as: AuthService,
                  private router: Router) {
  }

  //if user valid => if not go too '/login'
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.as.isLoggedin()
    ? true
      :this.router.parseUrl('login');
  }

}
