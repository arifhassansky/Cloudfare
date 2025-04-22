import OrderForm from "@/components/OrderForm";

export default function OrderPage() {
  return (
    <div className="p-6 pt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Place Your Order</h1>
      <OrderForm />
    </div>
  );
}
