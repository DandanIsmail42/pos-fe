import { useEffect, useState } from "react";
import useGetAuthUser from "../../../redux/hooks/useGetAuthUser";
import { apiGetAdress } from "../../../services/api";

interface Address {
  id: string;
  nama: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  detail: string;
}
const DataListAddress = () => {
  const [dataListAdress, setDataListAdress] = useState<Address[]>([]);
  const authUser = useGetAuthUser();

  useEffect(() => {
    getAddress();
  }, []);
  const getAddress = async () => {
    try {
      const {
        data: { status, records },
      } = await apiGetAdress(authUser?.token);
      if (status === 200) {
        setDataListAdress(records);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    dataListAdress,
  };
};

export default DataListAddress;
