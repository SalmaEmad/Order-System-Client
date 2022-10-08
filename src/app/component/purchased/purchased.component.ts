import { Component, Injector, OnInit } from '@angular/core';
import { BaseURL, getPurchasedProductsAPI } from 'src/app/config/apis';
import { HttpService } from 'src/app/services/http.service';
import { product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit {
  http!: HttpService;
  products: product[] = [];
  BaseURL = BaseURL

  constructor(private injector: Injector) { 
    this.http = this.injector.get(HttpService)
  }

  ngOnInit(): void {
    this.http.GET(getPurchasedProductsAPI).subscribe((response)=>{
      let res = response as any;
      if(res.code === 200){
        this.products = res.message
      }
    })
  }


}
