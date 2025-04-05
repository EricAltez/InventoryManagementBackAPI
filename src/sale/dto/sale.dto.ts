export class CreateSaleDto {
  date: Date;
  products: [
    {
      productId: number;
      quantity: number;
    },
  ];
}

export class UpdateSaleDto {
  date: Date;
  products: [
    {
      productId: number;
      quantity: number;
    },
  ];
}
