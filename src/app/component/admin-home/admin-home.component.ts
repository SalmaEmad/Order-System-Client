import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseURL, createProductAPI, deleteProductAPI, editProductAPI, getProductsAPI } from 'src/app/config/apis';
import { HttpService } from 'src/app/services/http.service';
import { product } from 'src/app/shared/models/product';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  http!: HttpService;
  products: product[] = [];
  purchasedProducts: product[] = [];
  editForm !: FormGroup;
  addForm !: FormGroup;
  currentProduct: any = {}
  BaseURL = BaseURL

  constructor(private injector: Injector) { 
    this.http = this.injector.get(HttpService)
    this.addForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    });
    this.editForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.http.GET(getProductsAPI).subscribe((response)=>{
      let res = response as any;
      if(res.code === 200){
        this.products = res.message
      }
    })
  }

  onAddFilesSelected(event: any){
    this.addForm.controls['image'].setValue(event.target.files[0])
  }

  openEditForm(id: number){
    this.currentProduct = this.products.filter(x => x.ProductId === id)[0];
    this.editForm.controls['productName'].setValue(this.currentProduct.ProductName);
    this.editForm.controls['price'].setValue(this.currentProduct.ProductPrice);
  }

  editProduct(){
    const newProduct = {
      ProductName: this.editForm.value.productName,
      ProductPrice: +this.editForm.value.price,
    }
    this.http.PUT(editProductAPI+this.currentProduct.ProductId, newProduct).subscribe((response)=>{
      let res = response as any;
      if(res.code === 200){
        Swal.fire(
          'Done!',
          "Product was edited successfully.",
          'success'
        )
        this.ngOnInit()
        this.editForm.reset()
      }
      else{
        Swal.fire(
          'Error!',
          "Product edit failed.",
          'warning'
        )
      }
    })
  }

  addNewProduct(){
    const newProduct = { 
      ProductName: this.addForm.value.productName,
      ProductPrice: +this.addForm.value.price,
      ProductImage: this.addForm.value.image
    }
    this.http.POSTWithForm(createProductAPI, newProduct).subscribe((response) =>{
      let res = response as any;
      if(res.code === 200){
        Swal.fire(
          'Done!',
          "Product has been added successfully.",
          'success'
        )
        this.ngOnInit()
        this.addForm.reset()
      }
      else{
        Swal.fire(
          'Error!',
          "Product wasn't added successfully.",
          'warning'
        )
      }
    })
  }

  deleteProduct(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.DELETE(deleteProductAPI+id).subscribe((response)=>{
          let res = response as any;
          if(res.code === 200){
            this.products = this.products.filter(x => x.ProductId !== id)
            Swal.fire(
              'Deleted!',
              "Product has been deleted successfully.",
              'success'
            )
          }
          else{
            Swal.fire(
              'Error!',
              "Product can't be deleted.",
              'warning'
            )
          }
        })
        
      }
    })
  }

}
