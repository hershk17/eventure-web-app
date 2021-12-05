import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { DbService } from './db.service';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(private db: DbService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(this.db.isLoggedIn());
    if(this.db.isLoggedIn() && route.routeConfig.path === 'login') {
      this.router.navigate(['tabs']);
      return true;
    }
    if(!this.db.isLoggedIn() && route.routeConfig.path === 'login') {
      return true;
    }
    if (!this.db.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
