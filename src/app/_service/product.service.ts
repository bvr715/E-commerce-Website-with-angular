import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_modals/Product';
import { OrderDetails } from '../_modals/orderDetails';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  PATH_OF_API = 'http://localhost:8083/';

  constructor(private httpclient: HttpClient) {}

  addProduct(product: FormData) {
    return this.httpclient.post<Product>(
      this.PATH_OF_API + 'addproduct/',
      product,
      { responseType: 'json' }
    );
  }
  updateProduct(product: FormData) {
    return this.httpclient.post<Product>(
      this.PATH_OF_API + 'updateproduct/',
      product,
      { responseType: 'json' }
    );
  }
  getAllProducts(pageNo?:any,keyword?:string,pageSize?:any,sortBy?:string,sortDir?:string) {
    if(keyword !=undefined){
      return this.httpclient.get(
        this.PATH_OF_API + 'getAllProducts?pageNo=' + pageNo+'&pageSize='+pageSize+'&sortBy='+sortBy+'&sortDir='+sortDir+'&keyword='+keyword,
        { observe: 'response' }
      );
    }else{
      return this.httpclient.get(
        this.PATH_OF_API + 'getAllProducts?pageNo='+ pageNo+'&pageSize=10'+'&sortBy=id'+'&sortDir=asc'+'&keyword=',
        { observe: 'response' }
      );
    }


  }

  getProductById(product_id: number) {
    return this.httpclient.get<Product>(
      this.PATH_OF_API + 'getProductById/' + product_id,
      { observe: 'response' }
    );
  }

  deleteProductById(productId: any) {
    return this.httpclient.delete(
      this.PATH_OF_API + 'deleteProductById/' + productId,
      { responseType: 'text' }
    );
  }
  public getProductDetails(isSingleProductCheckot: any, productId: any) {
    return this.httpclient.get<Product[]>(
      this.PATH_OF_API +
        'getProductDetails/' +
        isSingleProductCheckot +
        '/' +
        productId
    );
  }

  public placeOrder(orderDetails: OrderDetails) {
    return this.httpclient.post(this.PATH_OF_API + 'placeOrder', orderDetails, {
      responseType: 'json',
    });
  }
}
