import { Product } from "./product.interface";

export interface User {
    userId: string;
    userEmail: string
    userName: string
    products?: Product[];
}
