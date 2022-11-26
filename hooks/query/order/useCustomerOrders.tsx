import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../../graphql/query/orders';

const useCustomerOrders = ({ customer_id }: { customer_id: string }) => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      carrier: value.carrier,
      createdAt: value.createdAt,
      shippingCost: value.shippingCost,
      trackingId: value.trackingId,
      trackingItems: value.trackingItems,
      Address: value.Address,
      City: value.City,
      Lat: value.Lat,
      Lng: value.Lng,
    }));

    // Filter out orders from the specific customer
    const customerOrders = orders.filter(
      (order) => order.trackingItems.customer_id === customer_id
    );

    setOrders(customerOrders);
  }, [data, customer_id]);

  return { loading, error, orders };
};

export default useCustomerOrders;
