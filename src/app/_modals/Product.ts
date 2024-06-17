import { FileHandle } from "./Image";

export class Product {
  product_id!:number;
  productName!: string;
  productDescription!: string;
  productDiscountPrice!: number;
  prodcutActualPrice!:number;
  productImage:FileHandle[]=[]
}
