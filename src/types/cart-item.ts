export type CartItem = {
  product:Product,
  quantity:number
}

type Product = {
  name:string,
  price:number,
  id:number
}