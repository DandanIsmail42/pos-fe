import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../services/api";

interface Product {
  image_url: any;
  name: string;
  price: number;
  description: string;
  category?: {
    name: string;
  };
  tags?: {
    name: string;
  };
  image: string; // Add image property
}

const ProductsData = () => {
  const [data, setData] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    fetchProducts(selectedCategory, selectedTag);
  }, [selectedCategory, selectedTag]);

  const fetchProducts = async (category: string, tag: string) => {
    try {
      const {
        data: { status, record },
      } = await apiGetProducts(category, tag);
      if (status === 200) {
        const productsWithConvertedPrice = record.map((item: Product) => ({
          ...item,
          price: convertPrice(item.price),
        }));
        setData(productsWithConvertedPrice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertPrice = (price: number): string => {
    if (price >= 1000) {
      const formattedPrice = (price / 1000).toFixed(1);
      if (formattedPrice.endsWith(".0")) {
        return formattedPrice.slice(0, -2) + "k";
      } else {
        return formattedPrice + "k";
      }
    } else {
      return price.toString();
    }
  };

  return {
    data,
    selectedCategory,
    selectedTag,
  };
};

export default ProductsData;
