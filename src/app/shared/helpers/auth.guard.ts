import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpService) { }
  
  canActivate(): boolean {
    if (this.http.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/'])
      return false;
    }
  }
}
