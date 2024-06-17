import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../_modals/Product';
import { ProductService } from '../_service/product.service';
import { FileHandle } from '../_modals/Image';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css']
})
export class ViewProductDetailsComponent implements OnInit {

  product_id:any;

  selectedImageIndex=0;

  product: Product = new Product;

  constructor( private activatedRoute:ActivatedRoute,private productService:ProductService,private sanitizer: DomSanitizer,private router:Router){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.product_id = params['product_id'];
    });
    this.productService.getProductById(this.product_id).subscribe(
      (res)=>{
        if(res.body !=null){
          //this.product=res.body;
        this.product= this.createImage(res.body);
          console.log(res.body.productImage);
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  createImage(product: Product) {
    const productImages: any[] = product.productImage;

    const productImageToFileHandle: FileHandle[] = [];
    for (let i = 0; i < productImages.length; i++) {
      const imageFileDate = productImages[i];
      const imageBlob = this.dataUrlToBlob(
        imageFileDate.picByte,
        imageFileDate.type
      );
      const imageFile = new File([imageBlob], imageFileDate.name, {
        type: imageFileDate.type,
      });
      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile)
        ),
      };
      productImageToFileHandle.push(finalFileHandle);
    }
    product.productImage = productImageToFileHandle;
    return product;
  }

  public dataUrlToBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: imageType });
  }

  changeIndex(index:any){
    this.selectedImageIndex=index;
  }

  byeProduct(productId:any){
    this.router.navigate(['/byeProduct',{
      isSingleProductCheckout:true,id:productId
    }]);
  }
}
