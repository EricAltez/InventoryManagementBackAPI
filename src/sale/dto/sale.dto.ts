export class CreateSaleDto {
  date: Date;
  products: [
    {
      id: number;
      quantity: number;
    },
  ];
}

export class UpdateSaleDto {
  date: Date;
  products: [
    {
      id: number;
      quantity: number;
    },
  ];
}

export class LoadSaleDto {
  saleList: [
    {
      id: number;
      quantity: number;
    },
  ];
}
