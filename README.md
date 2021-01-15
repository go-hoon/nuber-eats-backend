# Nuber Eats

The Backend of Nuber Eats Clone

- Orders Subscription (Owner, Customer, Delivery)
  - Pending Orders (Owner) (s: newOrder) (t: createOrder(newOrder))
  - Order Status (Customer, Delivery, Owner) (s: orderUpdate) (t: editOrder(orderUpdate))
  - Pending Pickup Order (Delivery) (s: orderUpdate) (t: editOrder(orderUpdate))
- Payments (CRON JOB)
