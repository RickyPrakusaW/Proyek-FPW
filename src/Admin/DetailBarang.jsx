import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailBarang = () => {
  const { id } = useParams(); // Mendapatkan ID produk dari URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/admin/products/${id}`) // Endpoint detail produk
      .then((response) => {
        setProduct(response.data.data); // Asumsikan API mengembalikan { data: {...} }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">{product.Nama_product}</h1>
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
        <img
          src={`http://localhost:3000/uploads/product/${product.Photo_product}`}
          alt={product.Nama_product}
          className="w-full lg:w-1/2 object-cover rounded-md"
        />
        <div className="flex-1">
          <p className="mb-2 text-gray-700">Harga: Rp {product.Harga}</p>
          <p className="mb-2 text-gray-700">Stok: {product.Stock_barang}</p>
          <p className="mb-2 text-gray-700">Tanggal Masuk: {product.Tanggal_masuk}</p>
          <p className="mb-2 text-gray-700">Deskripsi: {product.Deskripsi || "Tidak ada deskripsi."}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailBarang;
