import React, { useEffect, useState } from "react";
import useGetAuthUser from "../../redux/hooks/useGetAuthUser";
import profil from "../../assets/profil.webp";
import Logout from "../../pages/auth/logout/Logout";
import { apiGetCategory, webserviceurlMain } from "../../services/api";
import ModalSettings from "../Modals/ModalSettings";
import { IoMdNotifications } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setSelectedCategory,
  setSelectedTag,
} from "../../redux/features/productsSlice";

const Header = () => {
  const authUser = useGetAuthUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalCategory, setModalCategory] = useState(false);
  const location = useLocation();
  const profileImage = `${webserviceurlMain}/images/users/${authUser?.user?.image_url}`;
  const { AuthLogout } = Logout();
  const dispatch = useDispatch();

  const handleCategoryClick = (category: string) => {
    if (category === "Semua") {
      dispatch(setSelectedCategory("")); // Kosongkan filter kategori
      dispatch(setSelectedTag("")); // Kosongkan filter tag
    } else {
      dispatch(setSelectedCategory(category)); // Kirim aksi Redux untuk set kategori
      dispatch(setSelectedTag("")); // Atur tag menjadi kosong saat kategori berubah
    }
  };
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );
  const handleTagClick = (tag: string) => {
    dispatch(setSelectedCategory("")); // Atur kategori menjadi kosong saat tag berubah
    dispatch(setSelectedTag(tag)); // Kirim aksi Redux untuk set tag
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fungsi untuk menampilkan produk berdasarkan query pencarian
  const searchProducts = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchQuery)); // Kirim aksi Redux untuk menyimpan query pencarian
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleModal2 = () => {
    setModal(!modal);
  };
  const toggleModalCategory = () => {
    setModalCategory(!modalCategory);
  };

  const showSearch = location.pathname === "/home";

  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    try {
      const {
        data: { status, record },
      } = await apiGetCategory();
      if (status === 200) {
        setDataCategory(record);
        console.log(record, "c");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {modal && <ModalSettings onClose={() => setModal(false)} />}

      <div
        className={
          showSearch
            ? "h-16 px-4 drop-shadow-md bg-white flex justify-between items-center"
            : "h-16 px-4 drop-shadow-md bg-white flex justify-end items-center"
        }
      >
        {showSearch && (
          <div className="w-2/5 h-3/5 flex gap-5">
            <form onSubmit={searchProducts}>
              {" "}
              {/* Ganti <button> menjadi <form> dan tambahkan atribut onSubmit */}
              <input
                className=" h-full p-2 mb-4  border-gray-300 border-2 rounded-l-md mx-auto"
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
              />
              <button
                type="submit"
                className="w-24 h-full rounded-r-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Search
              </button>
            </form>
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-orange-500"
              onClick={toggleModalCategory}
            >
              <p>Kategori</p>
              {modalCategory ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <p>{authUser?.user?.full_name}</p>
          <img
            src={authUser?.user?.image_url !== null ? profileImage : profil}
            className="w-10 h-10 object-cover rounded-full cursor-pointer"
            onClick={toggleModal}
          />
          <IoMdNotifications className="text-2xl text-orange-400" />
        </div>
        {isModalOpen && (
          <div className="absolute top-16 right-4 w-24 bg-white border border-gray-200 p-2 rounded shadow-md ">
            <ul>
              <li
                className="cursor-pointer hover:bg-neutral-200  active:bg-neutral-200"
                onClick={toggleModal2}
              >
                Profil
              </li>
              <hr className="border-t border-gray-500 mt-1 mb-1" />
              <li
                className="cursor-pointer hover:bg-neutral-200 hover:no-underline active:bg-neutral-200"
                onClick={AuthLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
        {modalCategory && (
          <div className="absolute top-16 left-80 w-24 bg-white border border-gray-200 p-2 rounded shadow-md ">
            <ul>
              {dataCategory.map((category: any) => (
                <li
                  key={category} // Tambahkan key untuk setiap elemen dalam daftar
                  onClick={() => handleCategoryClick(category?.name)}
                  className={`cursor-pointer hover:bg-neutral-200  active:bg-neutral-200 ${
                    selectedCategory === category.name ? "bg-gray-300" : "" // Tambahkan logika untuk menentukan kategori yang dipilih
                  }`}
                >
                  {category?.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
