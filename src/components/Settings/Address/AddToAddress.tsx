import React, { useEffect, useState } from "react";
import {
  apiGetDistricts,
  apiGetProvience,
  apiGetRegencies,
  apiGetVillages,
  apiInsertAdress,
} from "../../../services/api";
import { useForm } from "react-hook-form";
import useGetAuthUser from "../../../redux/hooks/useGetAuthUser";
import { AlertSucces } from "../../Notifications/Alerts";
import { useNavigate } from "react-router-dom";
interface Provience {
  id: string;
  name: string;
}
interface Regencies {
  id: string;
  name: string;
}
interface Districts {
  id: string;
  name: string;
}
interface Villages {
  id: string;
  name: string;
}

const AddToAddress = () => {
  const { register, setValue, handleSubmit } = useForm();
  const [dataProvience, setDataProvience] = useState<Provience[]>([]);
  const [dataRegencies, setDataRegencies] = useState<Regencies[]>([]);
  const [dataDistricts, setDataDistricts] = useState<Districts[]>([]);
  const [dataVillages, setDataVillages] = useState<Villages[]>([]);
  const [selectedProvienceId, setSelectedProvienceId] = useState<any | null>(
    null
  );
  const [selectedRegenciesId, setSelectedRegenciesId] = useState<any | null>(
    null
  );
  const [selectedDistrictsId, setSelectedDistrictsId] = useState<any | null>(
    null
  );

  const authUser = useGetAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    getProvience();
  }, []);

  useEffect(() => {
    if (selectedProvienceId) {
      getRegencies(selectedProvienceId);
    }
  }, [selectedProvienceId]);
  useEffect(() => {
    if (selectedRegenciesId) {
      getDistricts(selectedRegenciesId);
    }
  }, [selectedRegenciesId]);

  useEffect(() => {
    if (selectedDistrictsId) {
      getVillages(selectedDistrictsId);
    }
  }, [selectedDistrictsId]);

  const insertAdress = async (value: any) => {
    const params: any = { ...value };
    try {
      const { data } = await apiInsertAdress(params, authUser?.token);
      if (data.status === 201) {
        AlertSucces(data.message);

        setValue("nama", "");
        setSelectedDistrictsId(null);
        setSelectedRegenciesId(null);
        setSelectedProvienceId(null);
        setValue("detail", "");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProvience = async () => {
    try {
      const provience = await apiGetProvience();
      setDataProvience(provience.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRegencies = async (params: any) => {
    console.log(params, "params");
    try {
      const regencies = await apiGetRegencies(params);
      setDataRegencies(regencies.data);
      console.log(dataRegencies, "dataRegencies");
    } catch (error) {
      console.log(error);
    }
  };
  const getDistricts = async (params: any) => {
    console.log(params, "params");
    try {
      const districts = await apiGetDistricts(params);
      setDataDistricts(districts.data);
      console.log(dataDistricts, "data districts");
    } catch (error) {
      console.log(error);
    }
  };
  const getVillages = async (params: any) => {
    console.log(params, "params");
    try {
      const villages = await apiGetVillages(params);
      setDataVillages(villages.data);
      console.log(dataVillages, "data villages");
    } catch (error) {
      console.log(error);
    }
  };

  const provienceOptions = dataProvience.map((provience) => ({
    id: provience.id,
    value: provience.name,
    label: provience.name,
  }));
  const regenciesOptions = dataRegencies.map((regencies) => ({
    id: regencies.id,
    value: regencies.name,
    label: regencies.name,
  }));
  const districtsOptions = dataDistricts.map((districts) => ({
    id: districts.id,
    value: districts.name,
    label: districts.name,
  }));
  const dataVillagesOptions = dataVillages.map((villages) => ({
    id: villages.id,
    value: villages.name,
    label: villages.name,
  }));

  const handleProvienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvienceName = e.target.value;
    const selectedProvience = dataProvience.find(
      (p) => p.name === selectedProvienceName
    );
    console.log(selectedProvience, "selectedProvience");
    if (selectedProvience) {
      setSelectedProvienceId(selectedProvience.id);
      setValue("provinsi", selectedProvience.name);
    } else {
      setSelectedProvienceId(null);
      setDataRegencies([]);
    }
  };

  const handleRegenciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegenciesName = e.target.value;
    const selectedRegencies = dataRegencies.find(
      (d) => d.name === selectedRegenciesName
    );
    if (selectedRegencies) {
      setSelectedRegenciesId(selectedRegencies.id);
      setValue("kabupaten", selectedRegencies.name);
    } else {
      setSelectedProvienceId(null);
      setDataDistricts([]);
    }
  };
  const handleDistrictsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrictName = e.target.value;
    const selectedDistricts = dataDistricts.find(
      (d) => d.name === selectedDistrictName
    );
    if (selectedDistricts) {
      setSelectedDistrictsId(selectedDistricts.id);
      setValue("kecamatan", selectedDistricts.name);
    } else {
      setSelectedProvienceId(null);
      setDataVillages([]);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(insertAdress)}>
        <div className="flex flex-col gap-2 justify-center items-center h-full mt-6">
          <input
            placeholder="Masukan nama alamat"
            {...register("nama")}
            className="border rounded-lg border-gray-400 w-2/3 px-2 py-2 mb-4"
          />
          <select
            {...register("provinsi")}
            onChange={handleProvienceChange}
            className="border rounded-lg border-gray-400 w-2/3 px-2 py-2"
          >
            <option value="">Pilih Provinsi</option>
            {provienceOptions.map((provience) => (
              <option key={provience.id} value={provience.value}>
                {provience.label}
              </option>
            ))}
          </select>
          {selectedProvienceId && (
            <select
              {...register("kabupaten")}
              className="border rounded-lg border-gray-400 w-2/3 px-2 py-2 mt-4"
              onChange={handleRegenciesChange}
            >
              <option value="">Pilih Kabupaten/Kota</option>
              {regenciesOptions.map((regencies) => (
                <option key={regencies.id} value={regencies.value}>
                  {regencies.label}
                </option>
              ))}
            </select>
          )}
          {selectedRegenciesId && (
            <select
              {...register("kecamatan")}
              className="border rounded-lg border-gray-400 w-2/3 px-2 py-2 mt-4"
              onChange={handleDistrictsChange}
            >
              <option value="">Pilih Kecamatan</option>
              {districtsOptions.map((districts) => (
                <option key={districts.id} value={districts.value}>
                  {districts.label}
                </option>
              ))}
            </select>
          )}
          {selectedDistrictsId && (
            <>
              <select
                {...register("kelurahan")}
                className="border rounded-lg border-gray-400 w-2/3 px-2 py-2 mt-4"
              >
                <option value="">Pilih Kelurahan</option>
                {dataVillagesOptions.map((villages) => (
                  <option key={villages.id} value={villages.value}>
                    {villages.label}
                  </option>
                ))}
              </select>
              <input
                placeholder="Masukan detail alamat"
                {...register("detail")}
                className="border rounded-lg border-gray-400 w-2/3 px-2 py-2 mt-4"
              />
              <button
                type="submit"
                className="w-2/3 h-10 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-4"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default AddToAddress;
