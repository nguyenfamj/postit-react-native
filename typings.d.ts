// Customer
type Customer = {
  email: string;
  name: string;
};

type CustomerList = {
  name: string;
  value: Customer;
};

// Tracking Item
type Item = {
  item_id: string;
  name: string;
  price: number;
  quantity: number;
};

type TrackingItem = {
  customer_id: string;
  customer: Customer;
  items: Item[];
};

// Order
type Order = {
  carrier: string;
  createdAt: string;
  shippingCost: number;
  trackingId: string;
  trackingItems: TrackingItem;
  Lat: number;
  Lng: number;
  Address: string;
  City: string;
};

type OrderResponse = {
  value: Order;
};
