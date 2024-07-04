import React, { useState } from "react";

import ListAddress from "./ListAddress";
import AddToAddress from "./AddToAddress";

const Address = () => {
  const [isShow, setIshow] = useState(false);
  return (
    <div className="w-full h-full">
      <section className="w-full flex justify-end">
        <button
          className="w-24 h-full px-2 py-1 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          onClick={() => setIshow(!isShow)}
        >
          {isShow ? "Kembali" : "Tambah"}
        </button>
      </section>
      <section>{isShow ? <AddToAddress /> : <ListAddress />}</section>
    </div>
  );
};

export default Address;
