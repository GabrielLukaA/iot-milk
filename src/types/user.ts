import { Address } from "./address";
import { Order } from "./order";

export   type User = {
  name: string;
  password: string;
  email: string;
  addresses: Address[];
  orders?: Order[];
};
