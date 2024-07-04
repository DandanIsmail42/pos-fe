import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { apiGetProducts, webserviceurlMain } from "../../services/api";
import ProductsData from "./dataProducts";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Import react-icons
import Modal from "../../components/Modals/ModalsProps";
import { formatCreatedAt } from "../../utils/convertDate";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [dataDetail, setDataDetail] = useState("");
  const { data } = ProductsData();

  const handleDetail = (row) => {
    setSelectedProduct(true);
    setDataDetail(row);
    console.log(row);
  };
  const handleEdit = (row) => {
    console.log("Edit product:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete product:", row);
  };
  const handleCloseModal = () => {
    setSelectedProduct(false);
  };
  const columns = [
    {
      name: "Nama",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category?.name,
      sortable: true,
    },
    {
      name: "Tags",
      selector: (row) => row.tags?.name,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={`${webserviceurlMain}/images/products/${row?.image_url}`}
          alt="Product"
          style={{ width: "50px", height: "50px", padding: "5px" }}
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleDetail(row)}>
            <FaEye className="text-lg text-gray-400" />
          </button>
          <button onClick={() => handleEdit(row)}>
            <FaEdit className="text-lg text-blue-900" />
          </button>
          <button
            className="text-lg text-red-500"
            onClick={() => handleDelete(row)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data} />{" "}
      {selectedProduct && (
        <Modal
          width="w-5/12"
          height="h-3/4"
          onClose={handleCloseModal}
          header="Detail Product"
        >
          <div>
            <div className="flex flex-1 items-center justify-center mb-4 mt-4">
              <img
                src={`${webserviceurlMain}/images/products/${dataDetail?.image_url}`}
                className="w-1/2"
              />
            </div>
            <p className="font-mono">Name : {dataDetail?.name}</p>
            <p className="font-mono">Price : {dataDetail?.price}</p>
            <p className="font-mono">Category : {dataDetail?.category?.name}</p>
            <p className="font-mono">Tags : {dataDetail?.tags?.name}</p>
            <p className="font-mono">
              Dibuat sejak : {formatCreatedAt(dataDetail?.createdAt)}
            </p>
            <p className="font-mono">Description : {dataDetail?.description}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Products;
