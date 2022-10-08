import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginAPI } from 'src/app/config/apis';
import { DecryptService } from 'src/app/services/decrypt.service';
import { HttpService } from 'src/app/services/http.service';
import { user } from 'src/app/shared/models/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: user = new user('', '');
  public http: HttpService;
  localStorage: DecryptService;
  LoginForm: FormGroup;
  loading: boolean = false;
  alert: boolean = false;

  constructor(private router: Router, private injector: Injector) {
    this.http = this.injector.get(HttpService);
    this.localStorage = this.injector.get(DecryptService);
    this.LoginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    this.localStorage.clearStorage();
  }

  login(){
    this.loading = true;
    this.user = { username: this.LoginForm.value.username, password: this.LoginForm.value.password}
    this.http.POSTWithoutToken(loginAPI, this.user).subscribe((response)=>{
      let res = response as any;
      if(res.code === 200){
        this.localStorage.setItem('token', res.data.access);
        this.localStorage.setItem('name', res.data.name);
        this.localStorage.setItem('role', res.data.role);
        if(res.data.role==='Admin')
          this.router.navigate(['/admin'])
        else
          this.router.navigate(['/home'])
        this.loading = false
      }
      else{
        this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3500)
        this.loading = false
      }
    })
  }

}
