export class CreateProductDto {
  name: string;
  price: number;
  description: string;
  stock: number;
  categories: string[];
}

//add update for categories
export class UpdateProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}
