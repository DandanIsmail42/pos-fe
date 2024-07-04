import { FaCartPlus } from "react-icons/fa";
import Tags from "../../components/tags/Tags";
import { apiGetProducts, webserviceurlMain } from "../../services/api";
import { IoIosPricetags } from "react-icons/io";
import ProductsData from "../Products/dataProducts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setData } from "../../redux/features/productsSlice";
import Cart from "../../components/Cart/Cart";
import { RootState } from "../../redux/store";
import useGetAuthUser from "../../redux/hooks/useGetAuthUser";
import { addToCart, updateCart } from "../../redux/features/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {
    data: products,
    selectedCategory,
    selectedTag,
    search,
  } = useSelector((state: RootState) => state.products);
  const authUser = useGetAuthUser();
  useEffect(() => {
    getProducts(selectedCategory, selectedTag, search);
  }, [selectedCategory, selectedTag, search]);

  const getProducts = async (category: string, tag: string, q: string) => {
    try {
      const {
        data: { status, record },
      } = await apiGetProducts(category, tag, q);
      if (status === 200) {
        dispatch(setData(record));
        console.log(record, "rec prod");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product: any) => {
    const item = { product, qty: 1 };
    dispatch(addToCart(item));
    dispatch(updateCart()); // Optional: Can be used to sync with backend immediately
  };
  return (
    <div className="flex w-full gap-2">
      <section
        style={{
          width: "95%",
          display: "flex",
          flexWrap: "wrap",
          height: "100%",
          maxHeight: "90vh",
          overflow: "scroll",
        }}
      >
        <Tags />
        <div className="flex flex-wrap w-full">
          {products.map((d, i) => (
            <div className="w-48 h-80 shadow-md px-2 mr-2 mt-2" key={i}>
              <div className="h-28 w-full">
                <img
                  src={`${webserviceurlMain}/images/products/${d?.image_url}`}
                  alt="steak"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-8">
                <h1 className="font-bold text-lg mt-2">{d.name}</h1>
              </div>
              <div className="h-16">
                <p className="text-sm">{d.description}</p>
              </div>
              <h1 className="font-bold flex items-center gap-2 text-xl mt-2">
                {d.price} <IoIosPricetags className="text-gray-400" />
              </h1>
              <div className="flex justify-end">
                <div
                  onClick={() => handleAddToCart(d)}
                  className="text-xl bg-orange-500 w-10 mt-4 rounded-md hover:bg-gradient-to-br from-orange-400 to-pink-500 cursor-pointer px-2 py-2"
                >
                  <FaCartPlus className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-4/12 h-screen shadow-2xl">
        <Cart />
      </section>
    </div>
  );
};

export default Home;
