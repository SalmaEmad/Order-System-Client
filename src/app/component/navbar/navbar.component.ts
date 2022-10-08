import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecryptService } from 'src/app/services/decrypt.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public http :HttpService;
  username: string = "";
  role: string = "";
  localStorage: DecryptService;

  constructor(private router: Router, private injector: Injector) {
    this.http = this.injector.get(HttpService);
    this.localStorage = this.injector.get(DecryptService);
  }

  ngOnInit(): void {
    this.username = this.localStorage.getItem('name');
    this.role = this.localStorage.getItem('role')
  }

  logout(){
    this.localStorage.clearStorage();
    this.router.navigate(['/'])
  }
}
