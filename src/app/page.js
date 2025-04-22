"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/productSlice";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  console.log(items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">All Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {items?.data?.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <div className="border border-gray-200 p-4 rounded-xl hover:shadow-lg cursor-pointer">
                <Image
                  src={`https://admin.refabry.com/storage/product/${item.image}`}
                  className="w-full rounded-xl h-48 object-cover"
                  width={600}
                  height={800}
                  alt={item.name}
                />
                <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                <p className="text-green-600 font-bold">৳{item.buying_price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
