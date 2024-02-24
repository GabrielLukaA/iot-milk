import { Address } from "./address";
import { ProductBatch } from "./product-batch";
import { User } from "./user";

export   type Order = {
  price: number;
  user: User;
  productBatch: ProductBatch;
  address:Address;
  demanded:boolean;
};