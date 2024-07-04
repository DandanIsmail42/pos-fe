import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGetAuthUser from "../../redux/hooks/useGetAuthUser";
import profil from "../../assets/profil.webp";
import { AlertFailed, AlertSucces } from "../Notifications/Alerts";
import { useNavigate } from "react-router-dom";
import { apiGetMe, apiUpdateUser, webserviceurlMain } from "../../services/api";
import { useDispatch } from "react-redux";
import { clearToken, clearUser } from "../../redux/features/authUserSlice";

interface UserData {
  image_url: string;
}

type UpdateUserFormData = {
  full_name: string;
  email: string;
  image: FileList | null; // FileList untuk image yang dipilih
  currentPassword: string;
  newPassword: string;
  role: string;
};

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [data, setData] = useState<UserData | null>(null);
  const authUser = useGetAuthUser();
  const navigate = useNavigate();
  const profileImage = `${webserviceurlMain}/images/users/${data?.image_url}`;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserFormData>();
  useEffect(() => {
    getme();
  }, []);
  const getme = async () => {
    try {
      const {
        data: { status, record },
      } = await apiGetMe(authUser?.token);
      if (status === 200) {
        console.log(authUser?.token, "token 200");
        setData(record);
        setValue("full_name", record?.full_name);
        setValue("email", record?.email);
        setValue("role", record?.role);
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      if (data.status === 401 && data.message === "Token tidak valid") {
        console.log(authUser?.token, "token 401");
        dispatch(clearUser());
        dispatch(clearToken());
        AlertSucces(data.message); // Menggunakan komponen Notifikasi dengan benar
        navigate("/login");
      }
    }
  };
  const updateUser = async (value: UpdateUserFormData) => {
    console.log("okkkk");
    const id = authUser?.user?._id;
    const formData = new FormData();
    formData.append("full_name", value.full_name);
    formData.append("email", value.email);
    if (value.image && value.image[0]) {
      formData.append("image", value.image[0]);
    }
    formData.append("currentPassword", value.currentPassword);
    formData.append("newPassword", value.newPassword);
    try {
      const { data } = await apiUpdateUser(id, formData, authUser?.token);

      if (data.status === 200) {
        AlertSucces("Silahkan Login Kembali");
        navigate("/login");
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      if (data.code === 422) {
        setError("full_name", {
          type: "manual",
          message: data.errors.full_name,
        });
        setError("email", {
          type: "manual",
          message: data.errors.email,
        });
        setError("currentPassword", {
          type: "manual",
          message: data.errors.currentPassword,
        });
        // setError("confirm_password", {
        // 	type: "manual",
        // 	message: data.errors.confirm_password,
        // });
      }
      if (data.status === 401) {
        AlertFailed(data.message);
      }
      if (data.status === 500) {
        console.log(error);
      }
    }
  };
  return (
    <div className="md:flex">
      <div className=" w-52 flex flex-col items-center mr-10">
        <img
          src={authUser?.user?.image_url !== null ? profileImage : profil}
          className="w-44 h-44 object-cover cursor-pointer"
        />
        <p
          className="mt-2 cursor-pointer hover:text-blue-500"
          onClick={() => setIsDisabled(true)}
        >
          Ubah Profile
        </p>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(updateUser)}>
          <div className="w-full flex flex-col justify-center">
            <label>Nama Lengkap : </label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-3/4 h-9 p-2 mb-4 border border-gray-300"
              disabled={!isDisabled}
              {...register("full_name", {
                required: {
                  value: true,
                  message: "Nama lengkap wajib diisi",
                },
                minLength: {
                  value: 5,
                  message:
                    "Nama lengkap wajib diisi tidak boleh kurang dari 5 karakter",
                },
              })}
            />
          </div>
          <div className="w-full flex flex-col justify-center">
            <label>Email : </label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-3/4 h-9 p-2 mb-4 border border-gray-300"
              disabled={!isDisabled}
              {...register("email", {
                required: {
                  value: true,
                  message: "Email wajib diisi",
                },
                minLength: {
                  value: 5,
                  message:
                    "Email wajib diisi tidak boleh kurang dari 5 karakter",
                },
              })}
            />
          </div>
          <div className="w-full flex flex-col justify-center">
            <label>Role : </label>
            <input
              type="text"
              className="w-3/4 h-9 p-2 mb-4 border border-gray-300"
              disabled
              {...register("role")}
            />
          </div>
          {isDisabled && (
            <>
              <div className="w-full flex flex-col justify-center">
                <label>Password saat ini : </label>
                <input
                  type="password"
                  placeholder="Nama Lengkap"
                  className="w-3/4 h-9 p-2 mb-4 border border-gray-300"
                  disabled={!isDisabled}
                  {...register("currentPassword", {
                    required: {
                      value: true,
                      message: "Password wajib diisi",
                    },
                    minLength: {
                      value: 5,
                      message:
                        "Password wajib diisi tidak boleh kurang dari 5 karakter",
                    },
                  })}
                />
              </div>
              <div className="w-full flex flex-col justify-center">
                <label>Password Baru : </label>
                <input
                  type="password"
                  placeholder="Nama Lengkap"
                  className="w-3/4 h-9 p-2 mb-4 border border-gray-300"
                  disabled={!isDisabled}
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "Password Baru wajib diisi",
                    },
                    minLength: {
                      value: 5,
                      message:
                        "Password Baru wajib diisi tidak boleh kurang dari 5 karakter",
                    },
                  })}
                />
              </div>
              <div className="w-full">
                <input type="file" {...register("image")} />
              </div>
              <div className="w-3/4 flex justify-end mt-2">
                <button
                  type="submit"
                  className="w-24 h-10 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
