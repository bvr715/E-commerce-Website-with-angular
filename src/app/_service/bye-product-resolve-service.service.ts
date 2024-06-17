import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_modals/Image';
import { ProductService } from './product.service';
import { Product } from '../_modals/Product';
@Injectable({
  providedIn: 'root',
})
export class ByeProductResolveServiceService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get('id');
    const isSingleProductCheckout = route.paramMap.get(
      'isSingleProductCheckout'
    );
    return this.productService
      .getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) => this.createImage(product))
        )
      );
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
}
