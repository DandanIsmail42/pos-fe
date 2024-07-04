import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertSucces } from "../../../components/Notifications/Alerts";
import { apiLogout } from "../../../services/api";
import useGetAuthUser from "../../../redux/hooks/useGetAuthUser";
import { useDispatch } from "react-redux";
import { clearToken, clearUser } from "../../../redux/features/authUserSlice";

const Logout = () => {
  const authUser = useGetAuthUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AuthLogout = async () => {
    try {
      const { data } = await apiLogout(authUser?.token);
      if (data.status === 200) {
        dispatch(clearUser());
        dispatch(clearToken());
        AlertSucces(data.message); // Menggunakan komponen Notifikasi dengan benar
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    AuthLogout,
  };
};

export default Logout;
