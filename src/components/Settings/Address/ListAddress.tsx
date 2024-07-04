import DataTable from "react-data-table-component";
import DataListAddress from "./dataListAddress";

const ListAddress = () => {
  const { dataListAdress } = DataListAddress();

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Alamat",
      selector: (row) =>
        `${row.provinsi}, ${row.kabupaten}, ${row.kecamatan}, ${row.kelurahan} (${row.detail}).`,
      wrap: true,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={dataListAdress} />
    </>
  );
};

export default ListAddress;
