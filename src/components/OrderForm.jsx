"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { placeOrder } from "../redux/orderSlice";
import { useParams } from "next/navigation";

const OrderForm = () => {
  const { id } = useParams();
  const { items } = useSelector((state) => state.products);
  const product = items?.data?.find((p) => p.id == id);

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({
    c_name: "",
    c_phone: "",
    s_product_qty: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullData = {
      ...formData,
      product_ids: product?.unique_id,
      cod_amount: product?.buying_price,
      courier: "steadfast",
      advance: null,
      discount_amount: null,
      delivery_charge: "80",
    };

    dispatch(placeOrder(fullData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-white shadow rounded space-y-4"
    >
      <input
        name="c_name"
        value={formData.c_name}
        onChange={handleChange}
        placeholder="Customer Name"
        className="w-full border border-gray-200 rounded-lg p-2"
        required
      />
      <input
        name="c_phone"
        value={formData.c_phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full border border-gray-200 rounded-lg p-2"
        required
      />
      <input
        name="s_product_qty"
        value={formData.s_product_qty}
        onChange={handleChange}
        placeholder="Product Quantity"
        className="w-full border border-gray-200 rounded-lg p-2"
        required
      />
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Shipping Address"
        className="w-full border border-gray-200 rounded-lg p-2"
        required
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        {status === "loading" ? "Placing Order..." : "Place Order"}
      </button>

      {status === "succeeded" && (
        <p className="text-green-600">✅ Order placed successfully!</p>
      )}
      {status === "failed" && (
        <p className="text-red-600">
          ❌ {error?.message || "Something went wrong"}
        </p>
      )}
    </form>
  );
};

export default OrderForm;
