import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Product } from '../_modals/Product';
import { ProductService } from '../_service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_modals/Image';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product = new Product();

  productId: any;

  constructor(
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['product_id'];
    });
  }

  addProduct(productform: NgForm) {
    console.log(this.product);

    if (this.productId == null) {
      const productFormData = this.prepareFormData(this.product);

      this.productService.addProduct(productFormData).subscribe(
        (response: Product) => {
          console.log(response);
          productform.reset();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else {
      this.product.product_id = this.productId;
      const productFormData = this.prepareFormData(this.product);

      this.productService.updateProduct(productFormData).subscribe(
        (response: Product) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.productImage.length; i++) {
      formData.append(
        'imageFile',
        product.productImage[i].file,
        product.productImage[i].file.name
      );
    }
    return formData;
  }

  clear(productForm:NgForm) {
   productForm.reset();
  }

  OnSelectedFile(event: any) {
    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];
      const filehandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.product.productImage.push(filehandle);
    }
  }
  removeImg(id: any) {
    this.product.productImage.splice(id, 1);
    console.log(this.product.productImage);
  }
  fileDropped(fileHandle: any) {
    this.product.productImage.push(fileHandle);
  }
}
