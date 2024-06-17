import { Component } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { Product } from '../_modals/Product';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from '../_modals/Image';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-show-product-detals',
  templateUrl: './show-product-detals.component.html',
  styleUrls: ['./show-product-detals.component.css'],
})
export class ShowProductDetalsComponent {
  employees: any = [5, 10, 15, 20, 30, 100];

  selectedRecords: any;

  public totalPages!: number;

  public totalElements!: number;

  public noOfElementsPerPage!: number;

  public curser = false;

  public arrow!: boolean;

  responseSubject = new BehaviorSubject<any[] | null>(null);

  private currentPageSubject = new BehaviorSubject<number>(0);

  currentPage$ = this.currentPageSubject.asObservable();

  sortKeyword: string = 'disable';

  keyword: string = '';
  pageNo: number = 0;
  pageSize: number = 10;
  sortBy: string = 'id';
  sortDir: string = 'asc';

  allProducts: Product[] = [];
  product = new Product();
  productId: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService
      .getAllProducts(
        this.pageNo,
        this.keyword,
        this.pageSize,
        this.sortBy,
        this.sortDir
      )
      .subscribe(
        (response: any) => {
         // console.log(response);
          if (response.body !== null) {
            this.allProducts = response.body.content;
            this.totalPages = response.body.totalPages;
            this.totalElements = response.body.totalElements;
            this.noOfElementsPerPage = response.body.numberOfElements;
            // console.log(this.allProducts, 'all');
          } else {
            console.log('Response body is null');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  transformedProducts!: Product[];

  ProductImageById(productId: any) {
    //  console.log(productId);

    const productsss: any[] = this.allProducts || [];

    const filteredProducts = productsss.filter(
      (product) => product.product_id === productId
    );

    // console.log(filteredProducts);

    this.transformedProducts = filteredProducts.map((product) =>
      this.createImage(product)
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

  deleteProductById(product_id: any) {
    this.productService.deleteProductById(product_id).subscribe(
      (response: any) => {
        alert(response);
        this.getAllProducts();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  clear() {}
  updateProductById(productId: any) {
    this.router.navigate(['/product', { product_id: productId }]);
  }

  gotToPage(
    name?: string,
    pageNumber: number = 0,
    pageSize: number = 10
  ): void {
    this.productService
      .getAllProducts(
        (this.pageNo = pageNumber),
        name,
        (this.pageSize = pageSize),
        this.sortBy,
        this.sortDir
      )
      .subscribe(
        (res: any) => {
          this.allProducts = res.body.content;
         // this.responseSubject.next(res.body.content);
          this.currentPageSubject.next(pageNumber);
          this.totalPages = res.body.totalPages;
          this.totalElements = res.body.totalElements;
          this.noOfElementsPerPage = res.body.numberOfElements;
         // console.log(res);
        },
        (error) => {
          // console.log(error);
          alert('unable to load next page');
        }
      );
  }

  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.gotToPage(
      name,
      direction === 'forward'
        ? this.currentPageSubject.value + 1
        : this.currentPageSubject.value - 1
    );
  }

  sortEmployees(sortBy: string, sortDir: string) {
    this.productService
      .getAllProducts(
        this.pageNo,
        this.keyword,
        this.pageSize,
        (this.sortBy = sortBy),
        (this.sortDir = sortDir)
      )
      .subscribe(
        (res: any) => {
          this.allProducts = res.body.content;
        },
        (error) => {
          alert('unable to sort the data');
        }
      );
  }
}
