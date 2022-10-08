import { HttpParams } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseURL, getProductsAPI, getPurchasedProductsAPI, purchaseProductAPI } from 'src/app/config/apis';
import { DecryptService } from 'src/app/services/decrypt.service';
import { HttpService } from 'src/app/services/http.service';
import { product } from 'src/app/shared/models/product';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  http!: HttpService;
  products: product[] = [];
  purchasedProducts: product[] = [];
  localStorage: DecryptService;
  BaseURL = BaseURL

  constructor(private injector: Injector) { 
    this.http = this.injector.get(HttpService)
    this.localStorage = this.injector.get(DecryptService);
  }

  ngOnInit(): void {
    this.http.GET(getProductsAPI).subscribe((response)=>{
      let res = response as any;
      if(res.code === 200){
        this.products = res.message
      }
    })
  }

  purchaseProduct(id: number){
    this.http.PUT(purchaseProductAPI+id, {}).subscribe((response)=>{
      let res = response as any
      console.log(res)
      if(res.code === 200){
        Swal.fire(
          'Done!',
          "Product was purchased successfully.",
          'success'
        )
      }
      else{
        Swal.fire(
          'Error!',
          "Product can't be purchased.",
          'warning'
        )
      }
    })
  }
}
