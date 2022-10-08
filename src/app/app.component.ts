import { Component, Injector } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ordersystem-client';
  public http :HttpService;

  constructor(private injector: Injector) {
    this.http = this.injector.get(HttpService);
  }
}
