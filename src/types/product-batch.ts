import { Product } from ".";

export  type ProductBatch = {
  id?:number;
  product?: Product;
  expirationDate?: Date;
  fabricationDate?: Date;
  productQuantity?:number;
  quantityAvailable?:number
};