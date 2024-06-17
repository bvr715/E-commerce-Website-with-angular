import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../_modals/Product';
import { ProductService } from '../_service/product.service';
import { FileHandle } from '../_modals/Image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allProducts: Product[] = [];
  product = new Product();
  productId: any;
  pageNo:any=0;
  loadbutton:boolean=true;
  finalarry:Product[]=[]

  transformedProducts!:Product[];
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts(this.pageNo).subscribe(
      (response:any) => {
        console.log(response);
        if (response.body.content !== null) {
          console.log(response.body.content.length);
          if(response.body.content.length <=9){
            this.loadbutton=false;
            
          }
          this.allProducts = response.body.content;
          this.transformedProducts = this.allProducts.map(product => this.createImage(product));

          this.transformedProducts.forEach(p=>{
            this.finalarry.push(p);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadMore(){
    this.pageNo=this.pageNo+1;
    this.getAllProducts();
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
  viewProductDetails(product_id:any){
    this.router.navigate(['/productViewDetials', {product_id:product_id}]);
  }
}
