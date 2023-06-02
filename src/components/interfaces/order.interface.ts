export interface IOrder {
  orderNumber: string;
  sourceType: string;
  status: string;
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
    } | null;
    contact: {
      name: string;
      phone: string;
    } | null;
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
  itemsAggregate: { [key: string]: number };
}
