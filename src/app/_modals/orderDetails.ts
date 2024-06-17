import { OrderProductQuantity } from "./OrderProductQuantity";

export class OrderDetails{
  fullName!: string;
  fullAddress!: string;
  contactNumber!: string;
  alternateContactNumber!: string  ;
  orderProductQuantityList!: OrderProductQuantity[];
}
