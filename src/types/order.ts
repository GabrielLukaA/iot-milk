import { ProductBatch } from "./product-batch";
import { User } from "./user";

export   type Order = {
  price: number;
  user: User;
  productBatches: ProductBatch[];
};