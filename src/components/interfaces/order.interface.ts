export interface IOrder {
  orderNumber: string;
  sourceType: string;
  event: {
    deliveryTime: string;
    address: {
      city: string;
      name: string;
      state: string;
      street: string;
      street2: string | null;
      street3: string | null;
      zip: string;
    };
    contact: {
      name: string;
      phone: string;
    };
  };
  contact: {
    firstName: string | null;
    lastName: string | null;
  };
  totals: {
    subTotal: number;
    catererTotalDue: number;
    tip: number;
    deliveryFee: number;
    commission: number;
  };
  items: {
    quantity: number;
    name: string;
    cost: number;
  }[];
}
