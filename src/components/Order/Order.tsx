import React, { useEffect, useState } from "react";
import { apiGetAdress } from "../../services/api";
import useGetAuthUser from "../../redux/hooks/useGetAuthUser";

const Order = () => {
  const [data, setData] = useState<any[]>([]);
  const authUser = useGetAuthUser();

  useEffect(() => {
    getAdress();
  }, []);

  const getAdress = async () => {
    try {
      const {
        data: { status, records },
      } = await apiGetAdress(authUser?.token);
      if (status === 200) {
        setData(records);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data, "ini data");
  return (
    <div>
      {data.map((item) => (
        <div key={item._id}>
          <div className="flex  px-8 gap-6">
            <input type="checkbox" key={item._id} />
            <div className="flex flex-col mt-10">
              <h5 className="font-bold">{item.detail}</h5>
              <p className="ml-auto">{`${item.provinsi}, ${item.kabupaten}, ${item.kecamatan}, ${item.kelurahan}`}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
