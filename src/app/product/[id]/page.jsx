"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  IoHeart,
  IoHeartOutline,
  IoShareSocialOutline,
  IoStar,
} from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { items } = useSelector((state) => state.products);
  const product = items?.data?.find((p) => p.id == id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("");

  if (!product) {
    return (
      <p className="p-4 text-center text-gray-500">
        Product not found or loading...
      </p>
    );
  }

  const images = [
    `https://admin.refabry.com/storage/product/${product.image}`,
    // Duplicate for slider effect
    `https://admin.refabry.com/storage/product/${product.image}`,
    `https://admin.refabry.com/storage/product/${product.image}`,
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectThumbnail = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="relative">
          <div className="flex">
            <div className="flex items-center justify-center w-[90%] bg-gray-100 overflow-hidden rounded-md">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-[300px] h-[400px] object-contain"
              />
            </div>
            <div className="flex flex-col justify-between gap-[15px] ml-[20px]">
              <div className="flex flex-col gap-[10px]">
                <button className="bg-gray-100 rounded-md w-max text-gray-600 p-2.5 hover:bg-gray-200">
                  <IoShareSocialOutline className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-gray-100 rounded-md w-max text-gray-600 p-2.5 hover:bg-gray-200"
                >
                  {isFavorite ? (
                    <IoHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <IoHeartOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex flex-col gap-[10px]">
                <button
                  onClick={prevImage}
                  className="bg-gray-100 rounded-md w-max p-2 hover:bg-gray-200"
                >
                  <BiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-gray-100 rounded-md w-max p-2 hover:bg-gray-200"
                >
                  <BiChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="scrollbar flex w-full md:w-[87%] gap-2 mt-4 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => selectThumbnail(index)}
                className={`flex-shrink-0 bg-gray-100 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  currentImageIndex === index
                    ? "border-[#0FABCA]"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumb ${index + 1}`}
                  width={600}
                  height={800}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div className="w-full">
              <p className="text-gray-400 text-sm">
                Category: {product.category.name}
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                {product.name}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-green-600">
                    ৳{product.price}
                  </span>
                  {product.discount_amount && (
                    <span className="text-gray-400 line-through ml-2">
                      ৳{product.price + product.discount_amount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <IoStar className="text-yellow-400" />
                  <span className="font-medium">4.5</span>
                  <span className="text-sm text-gray-500">(120+ Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border-t-2 border-gray-200 border-dashed pt-6">
            <h2 className="font-semibold text-gray-700 mb-2">Description:</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.short_desc}
            </p>
          </div>

          {/* Sizes */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium text-gray-400">
                Size:{" "}
                <span className="font-semibold text-gray-700">
                  {selectedSize}
                </span>
              </h2>
              <button className="text-gray-600 text-sm underline">
                View Size Chart
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border ${
                    selectedSize === size
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-green-600 hover:border-green-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div>
            <Link
              href={`/order/${product.id}`}
              className="grow py-3 px-6 bg-green-500 hover:bg-green-600 rounded-md text-white font-semibold"
            >
              Order Now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
