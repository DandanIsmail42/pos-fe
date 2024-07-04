// src/components/Cart/Cart.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCart,
  minToCart,
  updateCart,
} from "../../redux/features/cartSlice";
import { RootState } from "../../redux/store";
import { webserviceurlMain } from "../../services/api";
import { formatRupiah } from "../../utils/formatRupiah";
import Loading from "../Loading/Loading";
import { GrCart } from "react-icons/gr";
import Order from "../Order/Order";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const [isOrder, setIsOrder] = React.useState(false);
  const { items, status } = useSelector((state: RootState) => state.cart);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  const handleAddToCart = (product: any) => {
    const item = { product, qty: 1 };
    dispatch(addToCart(item));
    dispatch(updateCart());
  };
  const handleMinToCart = (product: any) => {
    const item = { product, qty: 1 };
    dispatch(minToCart(item));
    dispatch(updateCart());
  };

  const handleClickOrder = () => {
    setIsOrder(true);
  };
  console.log(items, "items");
  return (
    <>
      {status === "loading" && <Loading />}
      <div className="flex flex-col items-center gap-4 h-screen">
        {items.length > 0 && !isOrder ? (
          <>
            <h2 className="mt-1 font-mono text-2xl ">Cart</h2>
            <div className="flex flex-col gap-5 h-[60%] overflow-y-scroll scrollbar-none border-b-2 border-b-orange-500">
              {status === "succeeded" && (
                <>
                  {items?.map((item) => (
                    <div className="flex gap-8" key={item.product._id}>
                      <img
                        src={`${webserviceurlMain}/images/products/${item.product.image_url}`}
                        alt="product"
                        className="w-20 h-24 object-cover cursor-pointer rounded-md"
                      />

                      <div className="flex flex-col gap-1">
                        <span className="font-mono  ">
                          {" "}
                          {item.product.name}
                        </span>
                        <span className="font-mono  ">
                          {" "}
                          {`${formatRupiah(item.product?.price * item?.qty)},-`}
                        </span>

                        <span className="flex items-center  border ">
                          <button
                            onClick={() => handleMinToCart(item.product)}
                            className="p-1 w-6 h-6 border  border-orange-500 flex justify-center items-center hover:bg-orange-500 hover:text-white"
                          >
                            -
                          </button>
                          <p className="p-1 w-6 h-6 border  border-orange-500 flex justify-center items-center text-sm">
                            {item.qty}
                          </p>
                          <button
                            onClick={() => handleAddToCart(item.product)}
                            className="p-1 w-6 h-6 border  border-orange-500 flex justify-center items-center hover:bg-orange-500 hover:text-white"
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {status === "failed" && <p>Error loading cart items.</p>}
            </div>
            <div className="w-full  px-8 flex justify-between">
              <p>Total</p>
              <p>
                {formatRupiah(
                  items?.reduce((a, b) => a + b.qty * b.product.price, 0)
                )}
              </p>
            </div>
            <div className="w-full px-4">
              <button
                onClick={handleClickOrder}
                className="bg-orange-500 w-full text-white p-2 rounded-md hover:bg-gradient-to-br from-orange-400 to-pink-500 cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full  items-center mt-48 flex flex-col">
            {/* <GrCart
              size={100}
              color="gray"
              className="animate-bounce cursor-pointer"
            />
            <h1 className="text-xl font-mono text-gray-500 mt-2">
              <span className="typing">Let's go Checkout . .</span>
            </h1> */}
            <Order />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
