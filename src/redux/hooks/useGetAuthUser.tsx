import { useSelector } from "react-redux";

const useGetAuthUser = () => {
  const authUser = useSelector((state: RootState) => state.auth);
  return authUser ? authUser : null;
};

export default useGetAuthUser;
