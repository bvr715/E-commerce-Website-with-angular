import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../_modals/orderDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_modals/Product';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-bye-product',
  templateUrl: './bye-product.component.html',
  styleUrls: ['./bye-product.component.css'],
})
export class ByeProductComponent implements OnInit {
  orderDetails = new OrderDetails();
  productDetails: Product[] = [];

  constructor(private activatedRoute: ActivatedRoute,private productService:ProductService,private router:Router) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    console.log(this.productDetails,'pro');
    this.orderDetails.orderProductQuantityList=[];
    this.productDetails.forEach((x) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: x.product_id,
        quantity: 1,
      })
    );
    console.log(this.productDetails,'pro');
  }
  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (res)=>{
        console.log(res);
        orderForm.reset;
        this.router.navigate(['/orderConfirmation']);
      },
      (error)=>{
        console.log(error);
      }
    )
    console.log(this.orderDetails);
  }
  clear() {}

  getQuantityForProduct(product_id:any){
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId===product_id
    );
    return filteredProduct[0].quantity
  }
  getCalculatedTotal(product_id:any,productDiscountPrice:any){
   const filteredProduct= this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId===product_id
    );
    return filteredProduct[0].quantity*productDiscountPrice;
  }

  onQuantityChange(q:any,product_id:any){
    const filteredProduct= this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId===product_id
    )[0].quantity=q;
  }
  getCalculatedGradTotal(){
    let grandTotal=0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
       const price=this.productDetails.filter(product=>product.product_id===productQuantity.productId)[0].productDiscountPrice;
     grandTotal=grandTotal+price*productQuantity.quantity;
      }
    );
    return grandTotal;
  }
}
