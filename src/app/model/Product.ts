import { Category } from "./Category";

export interface Product {
  id: number,
  name: string,
  brandName: string,
  desc: string,
  price: number,
  discount: number,
  category: Category,
  image: string,
  rating: number,
  available: boolean,
  wishlistFlag?: boolean
}